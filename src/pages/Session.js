import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer"
import Preloader from "../components/Preloader"
import { Button } from "react-materialize"
import SessionHeader from "../components/SessionHeader";
import API from "../utils/API";
import "../App.css"

export default function Session({ userData, setUserData, sessionData, setSessionData, isPlaying, setIsPlaying }) {

    const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState()
    const [error, setError] = useState(false)
    const [message, setMessage] = useState()


    const { id } = useParams()

    const handleFinish = () => {
        setIsPlaying(false)
        console.log('finish')
    }


    const handleBackToSearch = () => {
        setIsPlaying(false)
        setRedirect(<Redirect to="/search" />)
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
                    lyrics: [`[ti:${data.data.karaokeSong.name}]`, `[ar:${data.data.karaokeSong.artist}]`],
                    isActive: true

                })
                setLoading(false)
                return data;
            }).then(data => {

                console.log('Ready to call => API.getLyricsBySong(data.data.karaokeSong._id)')

                // API.getLyricsBySong(data.data.karaokeSong._id)

                //     .then(lrcFiles => {
                //         // setLyricsFile(lrcFiles.data)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })

            })
            .catch(err => {
                setMessage('we\'re sorry, \nsomething went wrong  :\'(')
                setLoading(false)
                setError(true)
                console.log('session response error', err)
            })
    }
    useEffect(() => {
        console.log('startSession', id)
        startSession();
    }, [])

    return (

        <div className="pageContents">

            {!userData.isLoggedIn ? <Redirect to="/" /> : null}

            <SessionHeader userData={userData} setUserData={setUserData} />

            {loading ? <Preloader /> : null}

            {!loading && !error
                ? <AudioPlayer
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    sessionData={sessionData}
                    setSessionData={setSessionData}
                    userData={userData}
                />
                : null
            }

            <Button
                onClick={handleFinish}
            >Finish
            </Button>

            {redirect}

        </div>
    )
}
