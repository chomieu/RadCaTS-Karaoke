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

    useEffect(() => {
        API.startSession(id)
            .then(data => {

                const sessionObj = {
                    hostId: data.data.host,
                    sessionId: data.data._id,
                    name: data.data.karaokeSong.name,
                    artist: data.data.karaokeSong.artist,
                    src: data.data.karaokeSong.mixed,
                }
                console.log(sessionObj)
                setSessionData(sessionObj)

                setTimeout(() => { setLoading(false) }, 5000)

            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    // Live Session - Starts
    let hostInfo, memberInfo
    userData.id === sessionData.host ?
        hostInfo = userData : memberInfo = userData

    const [member, setMember] = useState(hostInfo)

    const [allMembers, setAllMembers] = useState([])
    const [start, setStart] = useState(false)
    const [countdown, setCountdown] = useState()

    function handleNewMembers(users) {
        setAllMembers(users)
    }

    // useEffect(() => {
    //     setMemberInfo({
    //         userId: userData.id,
    //         username: userData.username,
    //         score: 0,
    //         avatar: userData.profilePicture // placeholder for actual avatar
    //     })
    //     return () => {
    //         setMemberInfo({})
    //     }
    // }, [])

    useEffect(() => {
        allMembers.filter(a => a.userId === memberInfo.id).length > 0 ? console.log("Member exists")
            : socket.emit("joinSession", id, memberInfo.id, (users) => handleNewMembers(users))
    }, [member, memberInfo])

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

    function handlePlaySound() {
        console.log("handleplaysound")
        socket.emit("start", id, { path: sessionData.src })
    }

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
                        </Col>
                        <Col s={12} m={6}>
                            Leaderboard
                            {console.log("all", allMembers)}
                            {console.log("userData", userData)}
                        </Col>
                    </Row>

                    {countdown}
                </>
            }
        </div>
    )
}
