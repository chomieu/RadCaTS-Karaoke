import React, { useEffect, useState } from "react";
import './App.css';
import API from "./utils/API"
import Header from "./components/Header";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Logout from "./components/Logout"
import Search from "./components/Search"
import FileDrop from "./components/FileDrop";
import Preloader from "./components/Preloader"
import AudioPlayer from "./components/AudioPlayer"




function App() {
  const [userState, setUserState] = useState({ id: "", username: "", token: "", isLoggedIn: false })
  const [songData, setSongData] = useState({})
  const [display, setDisplay] = useState({
    audioPlayer: false,
    fileDrop: false,
    loading: false,
    logout: false,
    search: false,
    signInBtns: false
  })

  // on pageload, check for active web token.
  // if theres a valid token, login user and display Search component
  // if not display SignIn & SignUp buttons
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) {
      API.getSecretClub(token)
        .then(res => {
          setUserState({
            username: res.data.user.username,
            id: res.data.user.id,
            token: token,
            isLoggedIn: true
          })
          setDisplay({ ...display, search: true, logout: true })
        }).catch(err => { localStorage.removeItem('token') })
    } else {
      console.log('!!!!!!!')
      setDisplay({ ...display, signInBtns: true })
    }
  }, [])


  return <div className="App center-align">
    <Header />

    {/* display when a user is not logged in */}
    {display.signInBtns
      ? <>
        <SignUp setUserState={setUserState} setDisplay={setDisplay} display={display} />
        <SignIn setUserState={setUserState} setDisplay={setDisplay} display={display} />
      </> : null}

    {display.loading ? <Preloader /> : null}

    {/* when login successful, display name on top of page  */}
    {userState.isLoggedIn ? <h2>{userState.username}</h2> : null}

    {/* display when toggled to true */}
    {display.search ? <Search userState={userState} songData={songData} setSongData={setSongData} display={display} setDisplay={setDisplay} /> : null}
    {display.audioPlayer ? <AudioPlayer /> : null}
    {display.logout ? <Logout userState={userState} setUserState={setUserState} setDisplay={setDisplay} display={display} /> : null}
    {display.fileDrop ? <FileDrop /> : null}

  </div>;
}

export default App;