import React, { useState, useEffect } from 'react'
import io from "socket.io-client"
import mp3File from "./babyShark.mp3"

const socket = io.connect("http://radcats-karaoke-server.herokuapp.com")
const audio = new Audio()

function App() {

  const [role, setRole] = useState("")
  const [playing, setPlaying] = useState("")

  useEffect(() => {
    function recieveMsg(m) {
      console.log(m)
      if (role === "member") {
      audio.src = m.path
      audio.play()
      }
      setPlaying(m.name)
    }
    socket.on("play", recieveMsg)

    return () => {
      socket.off("play", recieveMsg)
    }
  }, [role])

  function handlePlaySound() {
    socket.emit("play", { name: "Baby Shark", path: mp3File })
  }

  return (
    <div className="App">
      <h1>Proof of Concept</h1>
      <div>
        <h4>Role</h4>
        <button onClick={() => setRole("host")}>Host</button>
        <button onClick={() => setRole("member")}>Member</button>
      </div>
      <div>
        <button onClick={handlePlaySound}>Play</button>
      </div>
      <div>
        <h4>Playing {playing}</h4>
      </div>
    </div>
  );
}

export default App;