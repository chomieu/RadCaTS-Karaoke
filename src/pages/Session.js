import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer"
import { Button, Row, Col } from "react-materialize"
import Header from "../components/Header";
import API from "../utils/API";
import "../App.css"

// Live Session Dependencies
import io from "socket.io-client"

// Live Session Global Constants 
const socket = io.connect("http://localhost:3001")
const audio = new Audio()

export default function Session({ userData, setUserData, sessionData, setSessionData, isPlaying, setIsPlaying }) {

    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    const handleFinish = () => {
        // setIsPlaying(false) 
        console.log('finish') // send PUT request to /api/session/:id
    }


    const handleBack = () => {
        console.log('back')
        // setIsPlaying(false) 
    }

    const startSession = () => {
        API.startSession(id)
            .then((data) => {
                setSessionData({
                    ...sessionData,
                    hostId: data.data.host,
                    songName: data.data.karaokeSong.name,
                    artist: data.data.karaokeSong.artist,
                    mixed: data.data.karaokeSong.mixed,
                    sessionId: data.data._id,
                    songId: data.data.karaokeSong._id,
                    lyrics: [`[ti:${data.data.karaokeSong.name}]`, `[ar:${data.data.karaokeSong.artist}]`]
                })
                return data;
            }).then(data => {
                API.getLyricsBySong(data.data.karaokeSong._id)
                    .then(lrcFiles => {
                        // setLyricsFile(lrcFiles.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        console.log('startSession', id)
        startSession();
    }, [])

    // Live Session - Start

    const [member, setMember] = useState(userData)
    const [allMembers, setAllMembers] = useState([])
    const [start, setStart] = useState(false)
    const [countdown, setCountdown] = useState()
    const [leaderboard, setLeaderboard] = useState()

    function handleNewMembers(users) {
        setAllMembers(users)
    }

    function handlePlaySound() {
        console.log("handleplaysound")
        socket.emit("start", id, { path: sessionData.mixed })
    }

    useEffect(() => {
        socket.emit("joinSession", id, member.id, (users) => handleNewMembers(users))
        document.getElementById("leaderboard").append(<p>{member.username}</p>)
    }, [userData.id])

    useEffect(() => {
        function recieveMsg(m) {
            console.log(m)
            if (start) {
                let time = 3
                setCountdown(time)
                const timer = setInterval(() => {
                    if (time === 0) {
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
        }
        socket.on("play", recieveMsg)

        return () => {
            socket.off("play", recieveMsg)
        }
    }, [start])

    // Live Session - Ends

    return (
        <div className="pageContents">
            {!userData.isLoggedIn ?
                <Redirect to="/" />
                :
                <>
                    <Header userData={userData} setUserData={setUserData} />
                    <Row>
                        <Col s={12} m={6}>
                            <AudioPlayer
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                sessionData={sessionData}
                                userData={userData}
                                handlePlaySound={handlePlaySound}
                                setStart={setStart}
                                audio={audio}
                            />
                            <Button onClick={handleBack}>Back</Button>
                            <Button onClick={handleFinish}>Finish</Button>
                            {countdown}
                        </Col>
                        <Col s={12} m={6}>
                            Leaderboard
                            {console.log("all", allMembers)}
                            <div id="leaderboard"></div>
                        </Col>
                    </Row>

                </>
            }
        </div>
    )
}
