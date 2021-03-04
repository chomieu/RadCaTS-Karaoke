import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import MemberCard from "../components/MemberCard";
import { Button, Row, Col } from "react-materialize";
import Header from "../components/Header";
import API from "../utils/API";
import "../App.css"


// Live Session Dependencies
import io from "socket.io-client"
// Live Session Global Constants 
const socket = io.connect("http://localhost:3001")
// const socket = io.connect("http://radcats-karaoke-server.herokuapp.com")
const audio = new Audio()

export default function Session({ userData, setUserData, sessionData, setSessionData, isPlaying, setIsPlaying }) {

    const [lyrics, setLyrics] = useState({ isLoaded: false })
    const [pts, setPts] = useState({ pts: 0 })
    const { id } = useParams()

    const handleFinish = () => {
        setIsPlaying(false)
        const localData = localStorage.getItem('radcatsInfo')
        const userObj = JSON.parse(localData)
        const scoreData = { token: userObj.token, score: pts }
        API.finishSession(id, scoreData)
            .then(data => { console.log(data) })
            .catch(err => { console.log(err) })
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
                    lyrics: data.data.karaokeLyrics
                })
                let lyricsPath = data.data.karaokeLyrics.lyrics.lines
                if (lyricsPath) {
                    setLyrics({ lyrics: data.data.karaokeLyrics.lyrics.lines, isLoaded: true })
                } else { setLyrics({ lyrics: null, isLoaded: true }) }

            })
            .catch(err => {
                console.log('session response error', err)
            })
    }

    useEffect(() => {
        startSession();
    }, [])

    // Live Session - Start

    const [member, setMember] = useState(userData)
    const [start, setStart] = useState(false)
    const [countdown, setCountdown] = useState()
    const [leaderboard, setLeaderboard] = useState()

    function handlePts(users) {
        users = users.sort((a, b) => (a.pts < b.pts) ? 1 : -1)
        setLeaderboard(users.map(u => {
            return <MemberCard
                key={u.userId}
                pfp={u.pfp}
                username={u.username}
                pts={u.pts}
            />
        }))
    }

    function handlePlaySound() {
        { setPts({ pts: 0 }) }
        socket.emit("play", id, { path: sessionData.mixed })
    }

    useEffect(() => {
        socket.emit("joinSession",
            id,
            member.id,
            member.username,
            member.profilePicture,
            pts,
            (users) => handlePts(users)
        )
    }, [userData])

    useEffect(() => {
        function recieveMsg(m) {
            if (start) {
                let time = 3
                setCountdown(time)
                const timer = setInterval(() => {
                    if (time === 1) {
                        time = time - 1
                        setCountdown("Start")
                    } else if (time === 0) {
                        clearInterval(timer)
                        setCountdown("hide")
                    } else {
                        time = time - 1
                        setCountdown(time)
                    }
                }, 1000)
                setTimeout(() => {
                    audio.src = m.path
                    setIsPlaying(true)
                    audio.play()
                }, 5000)
            }
        }
        socket.on("play", recieveMsg)

        return () => {
            socket.off("play", recieveMsg)
        }
    }, [start])

    useEffect(() => {
        socket.emit("points", id, member.id, pts, (users) => handlePts(users))
    }, [pts])

    useEffect(() => {
        socket.on("leaderboard", handlePts)
    }, [pts])

    // Live Session - Ends

    return (
        <div className="pageContents">
            {!userData.isLoggedIn ?
                <Redirect to="/" />
                :
                <>
                    < Header audio={audio} userData={userData} setUserData={setUserData} setIsPlaying={setIsPlaying} />
                    <Row className="content_row">
                        <Col s={12} m={6}>
                            <AudioPlayer
                                pts={pts}
                                audio={audio}
                                lyrics={lyrics}
                                setPts={setPts}
                                userData={userData}
                                setStart={setStart}
                                isPlaying={isPlaying}
                                sessionData={sessionData}
                                setIsPlaying={setIsPlaying}
                                handlePlaySound={handlePlaySound}
                                handleFinish={handleFinish}
                                start={start}
                                setStart={setStart}
                                lyrics={lyrics}
                                audio={audio}
                                pts={pts}
                                setPts={setPts}
                                hidePlayBtn={member.id !== sessionData.hostId ? "none" : "contents"}
                            />
                            <div className={countdown === "hide" ? "counter-layer hidden" : "counter-layer"}>
                                {countdown}
                            </div>
                        </Col>
                        <Col s={12} m={6}>
                            <h4>Leaderboard</h4>
                            <div>
                                {leaderboard}
                            </div>
                        </Col>
                    </Row>

                </>
            }
        </div>
    )
}