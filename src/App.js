import React from "react";
import './App.css';
import Header from "./components/Header";
// import Loading from "./components/Loading";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
// import FileDrop from "./components/FileDrop";
// import Karaoke from "./components/Karaoke"
import AudioPlayer from "./components/AudioPlayer"


function App() {
  return <div className="App center-align">
    <Header />
    {/* <Loading /> */}
    {/* <TestModal /> */}
    {/* <SignIn /> */}
    {/* <SignUp /> */}
    <AudioPlayer />

    {/* <FileDrop /> */}
    {/* <Karaoke /> */}
  </div>;
}

export default App;