import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import Preloader from "../components/Preloader"
import Header from "../components/Header";
import API from "../utils/API";

export default function Session({ userData, setUserData }) {
    const [sessionData, setSessionData] = useState([]);
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        API.startSession(id)
            .then(data => {

                // parse stringified lyrics to an object array.
                let x = data.data
                let parsed = JSON.parse(x.lyrics)
                let lyricsArr = parsed.lines
                // build data object we need to start our session.
                let obj = {
                    artist: x.artist,
                    lyrics: lyricsArr,
                    mixed: x.mixed,
                    sessionId: id,
                    songId: x._id,
                    name: x.name
                }
                console.log(obj)
                // save the obj data to sessionData
                setSessionData(obj)
                setTimeout(() => { setLoading(false) }, 5000)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    return (
        <>
            {
                !userData.isLoggedIn
                    ? <Redirect to="/" />
                    : loading
                        ? <>
                            <Preloader />
                        </>
                        : <>
                            <Header userData={userData} setUserData={setUserData} />
                            <AudioPlayer userData={userData} sessionData={sessionData} />
                        </>
            }
        </>
    )
}
