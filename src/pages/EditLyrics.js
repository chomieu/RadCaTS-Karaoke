import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { Container, Button } from 'react-materialize';
import Preloader from '../components/Preloader'
import API from "../utils/API";
import "../App.css"



export default function EditLyrics({ userData, sessionData, setSessionData }) {

    const [message, setMessage] = useState(`loading . . .`)
    const [redirectPage, setRedirectPage] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { id } = useParams();

    const [audioSrc, setAudioSrc] = useState()



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
                setAudioSrc(data.data.karaokeSong.mixed);
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
                console.log('session response error')
                setMessage('we\'re sorry, \nsomething went wrong  :\'(')
                setLoading(false)
                setError(true)
                console.log(err)
            })
    }
    useEffect(() => {
        console.log('startSession', id)
        startSession();
    }, [])





    const handleSkip = () => {
        setRedirectPage(<Redirect to={`/api/session/${id}`} />)
    }
    const handleBack = () => {
        console.log('handleBack', sessionData)
        setRedirectPage(<Redirect to={`/search`} />)
    }

    return (
        <div className="pageContents">

            {!userData.isLoggedIn ? <Redirect to="/" /> : null}

            { redirectPage}

            {loading ? <Preloader /> : null}

            {!loading && !error

                ? <>
                    <Button onClick={handleBack} > Back to Search</Button>
                    <Button onClick={handleSkip}>Skip Lyrics</Button>
                </>

                : <Button onClick={handleBack} > Back to Search</Button>
            }

        </div >
    )
}
