import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KittyHeader from "./components/KittyHeader";
import SearchPage from "./pages/SearchPage";
import EditLyrics from "./pages/EditLyrics"
import Session from "./pages/Session";
import Landing from "./pages/Landing";
import API from "./utils/API"
import './App.css';


function App() {

  const [userData, setUserData] = useState({ isLoggedIn: false })
  const [sessionData, setSessionData] = useState({ isActive: false })
  const [isPlaying, setIsPlaying] = useState(false)

  const authorizeUser = () => {
    const token = localStorage.getItem("token")
    if (token) {

      API.checkWebToken(token)
        .then(res => { loginSuccess('checkWebToken', res) })
        .catch(err => { console.log("checkWebToken", err) })
    }
  }
  useEffect(() => { authorizeUser() }, [])

  const loginSuccess = (source, res) => {
    localStorage.setItem("token", res.data.token)
    console.log(source, res)

    setUserData({
      isLoggedIn: true,
      id: res.data.user._id,
      token: res.data.token,
      username: res.data.user.username,
      profilePicture: res.data.user.profilePicture
    })
  }

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <div>
            <KittyHeader isPlaying={isPlaying} />
            <Landing
              userData={userData}
              setUserData={setUserData}
              loginSuccess={loginSuccess}
            />
          </div>
          {/* <Header userData={userData} setUserData={setUserData} /> */}
        </Route>

        <Route exact path="/search">
          {/* <Header userData={userData} setUserData={setUserData} /> */}
          <KittyHeader isPlaying={isPlaying} />
          <SearchPage
            userData={userData}
            setUserData={setUserData}
            loginSuccess={loginSuccess}
          />
        </Route>

        <Route exact path="/lyrics/:id">
          <KittyHeader isPlaying={isPlaying} />
          <EditLyrics
            userData={userData}
            setUserData={setUserData}
            sessionData={sessionData}
            loginSuccess={loginSuccess}
            setSessionData={setSessionData}
          />
        </Route>

        <Route exact path="/api/session/:id">
          <KittyHeader isPlaying={isPlaying} />
          <Session
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            userData={userData}
            setUserData={setUserData}
            sessionData={sessionData}
            setSessionData={setSessionData}
            loginSuccess={loginSuccess}
          />
        </Route>

      </Switch>
    </Router>
  )
}

export default App;