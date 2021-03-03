import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { Button } from 'react-materialize';
import Preloader from '../components/Preloader'
import API from "../utils/API";
import "../App.css"



export default function EditLyrics({ sessionData, setSessionData }) {

    const [message, setMessage] = useState(`loading . . .`)
    const [redirectPage, setRedirectPage] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { id } = useParams();


    useEffect(() => {
        console.log('startSession', id)

        API.startSession(id)
            // collect session data from the session id
            // save to sessionData state
            // change displayed message
            // turn on Preloader
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
                setMessage('lets add lyrics!')
                setLoading(false)

            })
            // change displayed message
            // turn off Preloader
            // turn on error (button display)
            .catch(err => {
                console.log('session response error')
                setMessage('were sorry, \nsomething went wrong  :\'(')
                setLoading(false)
                setError(true)
                console.log(err)
            })
    }, [])


    const handleSkip = () => {
        console.log('handleSkip', sessionData)
        setRedirectPage(<Redirect to={`/api/session/${sessionData.sessionId}`} />)
    }
    const handleBack = () => {
        console.log('handleBack', sessionData)
        setRedirectPage(<Redirect to={`/search`} />)
    }

    return (
        <div>
            <br />
            <h2>Lyrics Editor Tool</h2>
            <br />
            <h4>{message}</h4>
            <br />

            {
                loading

                    ? <Preloader />

                    : !error

                        ? <Button
                            onClick={handleSkip}
                        >Skip Lyrics</Button>

                        : null
            }

            <Button
                onClick={handleBack}
            > Back to Search</Button>

            { redirectPage}

        </div >
    )

}
