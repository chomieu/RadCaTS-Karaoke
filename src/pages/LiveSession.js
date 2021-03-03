import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client"
import mp3File from "./babyShark.mp3"
import { useParams, Redirect } from "react-router-dom"

// const socket = io.connect("http://radcats-karaoke-server.herokuapp.com")
const socket = io.connect("http://localhost:3001")
const audio = new Audio()

function LiveSession({ userData, setUserData, sessionData, setSessionData }) {

  const { id } = useParams()
  const sessionId = id
  const [memberInfo, setMemberInfo] = useState({
    userId: userData.id || "1",
    username: userData.username || "Chomie",
    score: 0,
    avatar: userData.profilePicture || "tbd" // placeholder for actual avatar
  })
  const [allMembers, setAllMembers] = useState([])
  const [start, setStart] = useState(false)
  const [countdown, setCountdown] = useState()
  const [playing, setPlaying] = useState("")

  function handleNewMembers(users) {
    setAllMembers(users)
  }

  useEffect(() => {
    socket.emit("joinSession", sessionId, memberInfo.userId, (users) => handleNewMembers(users))
  }, [])

  useEffect(() => {
    function recieveMsg(m) {
      console.log(m)
      if (start) {
        let time = 3
        setCountdown(time)
        const timer = setInterval(()=> {
          if(time === 0) {
            clearInterval(timer)
            setCountdown("Start")
          } else {
            time = time - 1
            setCountdown(time)
          }
        }, 1000)
        setTimeout(() => {
          audio.src = m.path
          audio.play()
        }, 5000)
      }
      setPlaying(m.name)
    }
    socket.on("play", recieveMsg)

    return () => {
      socket.off("play", recieveMsg)
    }
  }, [start])

  // useEffect(() => {
  //   function recieveMsg(m) {
  //     console.log(m)
  //     if (role === "member") {
  //       audio.src = m.path
  //       audio.play()
  //     }
  //     setPlaying(m.name)
  //   }
  //   socket.on("play", recieveMsg)

  //   return () => {
  //     socket.off("play", recieveMsg)
  //   }
  // }, [role])

  function handlePlaySound() {
    console.log("handleplaysound")
    socket.emit("start", sessionId, { name: "Baby Shark", path: mp3File })
  }

  return (
    <div>
      {/* <h1>Karaoke Session {id}</h1> */}
      {/* <p>Connected Users: {allMembers}</p> */}
      <div>Your Info:</div>
      <button onClick={() => setStart(true)}>Ready</button>
      <button onClick={handlePlaySound}>Play</button>
      <h2>Counting down: </h2>
      {countdown}
      <div>
        <h4>Playing {playing}</h4>
      </div>
    </div>
  );
}

export default LiveSession;