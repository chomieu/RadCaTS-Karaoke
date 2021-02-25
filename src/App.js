import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header";
import Loading from "./components/Loading";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
// import FileDrop from "./components/FileDrop";
import AudioPlayer from "./components/AudioPlayer"




function App() {
  const [userState, setUserState] = useState({ id: "", username: "samFox", token: "", isLoggedIn: true })
  const [formState, setFormState] = useState({ email: '', username: '', password: '', confPassword: '' })
  const [pageLoad, setPageLoad] = useState({ status: true })

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
    {/* <Loading /> */}
    {!userState.isLoggedIn ? <SignUp /> : null}
    {!userState.isLoggedIn ? <SignIn /> : null}
    {userState.isLoggedIn ?
      <>
        <h2>{userState.username}</h2>
        <AudioPlayer />
      </>
      : null}


    {/* <FileDrop /> */}
  </div>;
}

export default App;