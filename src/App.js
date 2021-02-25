import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header";
import Preloader from "./components/Preloader";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import FileDrop from "./components/FileDrop";
import AudioPlayer from "./components/AudioPlayer"




function App() {
  const [userState, setUserState] = useState({ id: "", username: "samFox", token: "", isLoggedIn: false })
  const [formState, setFormState] = useState({ email: '', username: '', password: '', confPassword: '' })
  const [display, setDisplay] = useState({
    audioPlayer: false,
    fileDrop: false,
    loading: false
  })

  // on pageload, check for active web token.
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   API.getSecretClub(token).then(res => {
  //     setUserState({
  //       username: res.data.username,
  //       isLoggedIn: true,
  //       id: res.data.id,
  //       token: token
  //     })
  //   }).catch(err => { localStorage.removeItem('token') })
  // }, [])

  const handleFormInput = event => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value })
  }


  return <div className="App center-align">
    <Header />

    {/* display when a user is not logged in */}
    {!userState.isLoggedIn ? <SignUp /> : null}
    {!userState.isLoggedIn ? <SignIn /> : null}

    {/* when login successful, display name on top of page  */}
    {userState.isLoggedIn ? <h2>{userState.username}</h2> : null}

    {/* display when toggled to true */}
    {display.loading ? < Preloader /> : null}
    {display.audioPlayer ? <AudioPlayer /> : null}
    {display.fileDrop ? <FileDrop /> : null}



  </div>;
}

export default App;