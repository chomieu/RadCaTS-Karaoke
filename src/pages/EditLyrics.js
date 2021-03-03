import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { Button } from 'react-materialize';
import API from "../utils/API";
import "../App.css"



export default function EditLyrics({ sessionData, setSessionData }) {

    const [loading, setLoading] = useState(true)
    const [redirectPage, setRedirectPage] = useState()
    const { id } = useParams();


    useEffect(() => {
        console.log('start useEffect', id)

        API.startSession(id)
            .then(data => {
                console.log('session request response', data)

                // parse stringified lyrics to an object array.
                let x = data.data.karaokeSong
                let parsed = JSON.parse("[]")
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
                console.log('session response error')
                setLoading(false)
                console.log(err)
            })
    }, [])


    const handleSkip = () => {
        console.log('handleSkip')
        setRedirectPage(<Redirect to={`/api/session/${id}`} />)

    }

    return (
        <div className="pageContents">
            <h1>Lyrics Editor Tool</h1>
            <Button
                onClick={handleSkip}
            >Skip Lyrics</Button>
            {redirectPage}

        </div>
    )
}
