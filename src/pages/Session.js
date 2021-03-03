import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer"
import Preloader from "../components/Preloader"
import { Button } from "react-materialize"
import Header from "../components/Header";
import API from "../utils/API";
import "../App.css"

export default function Session({ userData, setUserData, sessionData, setSessionData, isPlaying, setIsPlaying }) {

    const [loading, setLoading] = useState(true)

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


    return (
        <>
            {!userData.isLoggedIn ? <Redirect to="/" /> : null}
            <Header userData={userData} setUserData={setUserData} />

            {loading

                ? <>
                    <Preloader />
                </>
                : <>
                    <AudioPlayer
                        isPlaying={isPlaying}
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
