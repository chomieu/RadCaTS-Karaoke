import React, { useEffect, useState } from "react";
import './App.css';
import API from "./utils/API"
import Header from "./components/Header";
import Preloader from "./components/Preloader";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import FileDrop from "./components/FileDrop";
import AudioPlayer from "./components/AudioPlayer"
import Logout from "./components/Logout"
import Search from "./components/Search"




function App() {
  const [userState, setUserState] = useState({ id: "", username: "samFox", token: "", isLoggedIn: false })
  const [songData, setSongData] = useState({})
  const [display, setDisplay] = useState({
    audioPlayer: false,
    fileDrop: false,
    loading: false,
    logout: false,
    search: false
  })

  // on pageload, check for active web token.
  useEffect(() => {
    const token = localStorage.getItem("token")
    API.getSecretClub(token)
      .then(res => {
        setUserState({
          username: res.data.username,
          isLoggedIn: true,
          id: res.data.id,
          token: token
        })
      }).catch(err => { localStorage.removeItem('token') })
  }, [userState.isLoggedIn])


  return <div className="App center-align">
    <Header />

    {/* display when a user is not logged in */}
    {!userState.isLoggedIn ?
      <>
        <SignUp setUserState={setUserState} />
        <SignIn setUserState={setUserState} setDisplay={setDisplay} display={display} />
      </>
      : null}

    {/* when login successful, display name on top of page  */}
    {userState.isLoggedIn ? <h2>{userState.username}</h2> : null}

    {/* display when toggled to true */}
    {display.loading ? < Preloader /> : null}
    {display.search ? <Search userState={userState} songData={songData} setSongData={setSongData} display={display} setDisplay={setDisplay} /> : null}
    {display.audioPlayer ? <AudioPlayer /> : null}
    {display.logout ? <Logout userState={userState} setUserState={setUserState} setDisplay={setDisplay} display={display} /> : null}
    {display.fileDrop ? <FileDrop /> : null}



  </div>;
}

export default App;