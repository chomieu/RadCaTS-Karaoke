import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KittyHeader from "./components/KittyHeader";
import SearchPage from "./pages/SearchPage";
import EditLyrics from "./pages/EditLyrics"
import Session from "./pages/Session";
import Landing from "./pages/Landing";
import API from "./utils/API";
import './App.css';
import { ContactsOutlined } from "@material-ui/icons";

function App() {

  let status, token, id, username, profilePicture
  const userInfo = JSON.parse(localStorage.getItem("radcatsInfo"))
  if (userInfo) {
    status = true
    token = userInfo.token
    id = userInfo.id
    username = userInfo.username
    profilePicture = userInfo.profilePicture
  } else {
    status = false
  }

  const [userData, setUserData] = useState({ isLoggedIn: status, token, id, username, profilePicture })
  const [sessionData, setSessionData] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [search, setSearch] = useState([''])

  const authorizeUser = () => {
    if (userInfo) {
      API.checkWebToken(token)
        .then(res => { loginSuccess('checkWebToken', res) })
        .catch(err => { console.log("checkWebToken", err) })
    }
  }

  useEffect(() => { authorizeUser() }, [token])

  const loginSuccess = (source, res) => {
    const radcatsInfo = {
      token: res.data.token,
      id: res.data.user._id,
      username: res.data.user.username,
      profilePicture: res.data.user.profilePicture
    }
    localStorage.setItem("radcatsInfo", JSON.stringify(radcatsInfo))
    console.log(source, res)

    const thisUsersSessionScores = [] // store high scores for user here
    // loop through session records for this user
    res.data.user.records.forEach(data => {
      const allUsersScores = data.scores // array of objects with userid:score key value pairs ex-> [{ userId: score }, { userId: score }, ...]
      // new object for each song id and score for the song
      const thisSongsData = {
        songId: data.karaokeSong
      }
      data.scores.forEach(x => {
        // if object key matches this userId & is greater then 0
        if (x[userData.id] > 0) {
          thisSongsData.score = x[userData.id] // add the score to thisSongsData
          thisUsersSessionScores.push(thisSongsData) // add the object to thisUsersSessionScores array
        }
      })
    })
    const thisUsersHighScores = [thisUsersSessionScores[0]] // preload high scores with the first object
    // loop through thisUsersSessionScores
    // if song is not in thisUsersHighScores yet, add it
    // if song is in thisUsersHighScores, compare scores
    // if score is lower, skip
    // if score is higher, update it
    thisUsersSessionScores.forEach((session, idx) => {
      // loop through highscores
      for (let i = 0; i < thisUsersHighScores.length; i++) {
        // if session id matches an id in high scores, compare scores
        // if stored score in high score is greater, exit the loop
        // if session score is greater, update high score with session score and exit the loop
        if (session.songId === thisUsersHighScores[i].songId) {
          if (session.score < thisUsersHighScores[i].score) { return }
          else {
            thisUsersHighScores[i].score = session.score
            return
          }
        }
      }
      // if loop wasn't exited above, no matching song was found, add this session data to high scores
      thisUsersHighScores.push(session)
    })

    setUserData({
      isLoggedIn: true,
      id: res.data.user._id,
      token: res.data.token,
      highScores: thisUsersHighScores,
      username: res.data.user.username,
      profilePicture: res.data.user.profilePicture
    })
  }
  useEffect(() => {
    if (userData.highScores) {
      console.log(userData.highScores)
      console.log(search)
    }
  }, [search, userData])


  return (
    <Router>

      <KittyHeader isPlaying={isPlaying} />
      <Switch>

        <Route exact path="/">
          <Landing
            userData={userData}
            setUserData={setUserData}
            loginSuccess={loginSuccess}
          />
        </Route>

        <Route exact path="/search">
          <SearchPage
            search={search}
            userData={userData}
            setSearch={setSearch}
            setUserData={setUserData}
            setIsPlaying={setIsPlaying}
          />
        </Route>

        <Route exact path="/lyrics/:id">
          <EditLyrics
            userData={userData}
            setUserData={setUserData}
            sessionData={sessionData}
            setSessionData={setSessionData}
          />
        </Route>

        <Route exact path="/api/session/:id">
          <Session
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            userData={userData}
            setUserData={setUserData}
            sessionData={sessionData}
            setSessionData={setSessionData}
          />
        </Route>

        <Route exact path="/api/user/:id">
          <Session
            userData={userData}
            setUserData={setUserData}
          />
        </Route>

      </Switch>
    </Router>
  )
}

export default App;