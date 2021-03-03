import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer"
import Preloader from "../components/Preloader"
import { Button } from "react-materialize"
import Header from "../components/Header";
import API from "../utils/API";
import "../App.css"

export default function Session({ userData, setUserData, sessionData, setSessionData }) {

    const [loadingSession, setLoadingSession] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)

    const { id } = useParams()

    const handleFinish = () => {
        // setIsPlaying(false) 
        console.log('finish')
    }


    const handleBack = () => {
        console.log('back')
        // setIsPlaying(false) 
    }

    useEffect(() => {
        setLoadingSession(true)

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

                setTimeout(() => { setLoadingSession(false) }, 5000)

            })
            .catch(err => {
                setLoadingSession(false)
                console.log(err)
            })
    }, [])


    return (
        <>
            {!userData.isLoggedIn ? <Redirect to="/" /> : null}
            <Header userData={userData} setUserData={setUserData} />

            {loadingSession

                ? <>
                    <Preloader />
                </>

                : <>
                    <AudioPlayer
                        setIsPlaying={setIsPlaying}
                        sessionData={sessionData}
                        userData={userData}
                    />
                </>

            }

            <Button
                onClick={handleBack}
            >Back
            </Button>

            <Button
                onClick={handleFinish}
            >Finish
            </Button>

        </>
    )
}
