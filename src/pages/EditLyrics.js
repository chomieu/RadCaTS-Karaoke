import React, { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { Button, Container, Textarea } from 'react-materialize';
import Preloader from '../components/Preloader'
import API from "../utils/API";
import "../App.css"



export default function EditLyrics({ userData, sessionData, setSessionData }) {

    const [message, setMessage] = useState(`loading . . .`)
    const [redirectPage, setRedirectPage] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { id } = useParams();
    const [lyrics, setLyrics] = useState([]);
    const [audioSrc, setAudioSrc] = useState();
    let [index, setIndex] = useState(0);
    const audio = useRef(null);
    const [lyricsFile, setLyricsFile] = useState({});

    const startSession = () => {
        API.startSession(id)
            .then((data) => {
                setSessionData({
                    ...sessionData,
                    mixed: data.data.karaokeSong.mixed,
                    songId: data.data.karaokeSong._id,
                    lyrics: [`[ti:${data.data.karaokeSong.name}]`, `[ar:${data.data.karaokeSong.artist}]`]
                })
                setAudioSrc(data.data.karaokeSong.mixed);
                return data;
            }).then(data => {
                API.getLyricsBySong(data.data.karaokeSong._id)
                    .then(lrcFiles => {
                        setLyricsFile({ file: lrcFiles.data, len: lrcFiles.data.length })
                        console.log(lrcFiles.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log('session response error')
                setMessage('were sorry, \nsomething went wrong  :\'(')
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
        setRedirectPage(<Redirect to={`/api/session/${sessionData.sessionId}`} />)
    }

    const handleLyricsChange = (e) => {
        setLyrics(e.target.value.split("\n"));
    };

    const handleAudioPace = (operation) => {
        switch (operation) {
            case "-":
                audio.current.currentTime -= 2;
                break;
            case "+":
                audio.current.currentTime += 2;
                break;
            default:
                break;
        }
    }

    const editTimestamp = (operation) => {
        let lyricsCopy = lyrics[index];
        switch (operation) {
            case "add":
                lyricsCopy = getTimestamp(audio.current.currentTime) + removeTimestamp(lyrics[index]);
                lyrics[index] = lyricsCopy
                setIndex(index = index + 1);
                break;
            case "remove":
                if (index >= 0) {
                    lyricsCopy = removeTimestamp(lyrics[index]);
                    lyrics[index] = lyricsCopy
                }
                break;
            default:
                break;
        }
        setLyrics([...lyrics]);
    }

    const removeTimestamp = (lyrics) => lyrics.replace(/^\[[0-9]{1,2}:[0-9]{1,2}\.[0-9]{1,2}\]/, "");

    const getTimestamp = (time) => {
        let min = parseInt(time / 60);
        let sec = parseInt(time - min * 60);
        let seci = parseInt((time - min * 60 - sec) * 100);
        return "[" + padding(min) + ":" + padding(sec) + "." + padding(seci) + "]";
    }

    const padding = (sec) => {
        if (sec < 10) return "0" + String(sec);
        else return String(sec);
    }

    const clearAll = () => {
        const removeall = lyrics.map(lrc => removeTimestamp(lrc));
        setLyrics(removeall);
        setIndex(0)
    }

    const uploadFile = () => {
        const fullLyricsArr = sessionData.lyrics.concat(lyrics);
        const fullLyricStr = fullLyricsArr.join("\n")
        const lyricsData = {
            creator: sessionData.hostId,
            associatedSong: sessionData.songId,
            lyrics: fullLyricStr
        }
        if (lyricsFile.length !== 0) {
            console.log(lyricsFile)
            const creatorFile = lyricsFile.file.find(file => file.creator._id === sessionData.hostId)
            console.log(creatorFile)
            if (creatorFile) {
                API.updateLyrics(lyricsData)
                    .then(data => {
                        console.log("update lyrics", data)
                        console.log("lyrcis updated")
                        applyLyrics(data.data.lyrics._id)
                    })
                    .catch(err => {
                        console.log("lyrics update err:", err)
                    })
            } else {
                API.uploadLyrics(lyricsData)
                    .then(data => {
                        console.log("upload lyrics", data)
                        console.log("lyrcis uploaded")
                        applyLyrics(data.data.lyrics._id)
                    })
                    .catch(err => {
                        console.log("lyrics upload err:", err)
                    })
            }
        }
    }

    const applyLyrics = (lyricsId) => {
        const data = {
            sessionId: sessionData.sessionId,
            lyricsId: lyricsId
        }
        API.addLyricsToSession(data)
            .then(() => {
                console.log("add lyrics to session")
                setRedirectPage(<Redirect to={`/api/session/${sessionData.sessionId}`} />)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Container className="pageContents">
            {lyricsFile.len > 0 ?
                <>
                    <h1>Lyrics List</h1>
                    <Container style={{ height: "500px", overflowY: "scroll" }}>
                        {lyricsFile.file.map((file, i) => (<Button key={i} data-lrc={file._id} onClick={(e) => applyLyrics(e.target.dataset.lrc)}>{file.associatedSong.name} - {file.associatedSong.artist} BY {file.creator.username}</Button>))}
                    </Container>
                    <Button onClick={() => (setLyricsFile({ ...lyricsFile, len: -1 }))}>Made My Own Lyrics</Button>
                </>
                : lyricsFile.len === 0 ?
                    <>
                        <h1>Lyrics List</h1>
                        <Container>
                            <h2>No lyrics avaliable</h2>
                        </Container>
                        <Button onClick={() => (setLyricsFile({ ...lyricsFile, len: -1 }))}>Made My Own Lyrics</Button>
                    </>
                    :
                    <>
                        <h1>Lyrics Editor Tool</h1>
                        <div>
                            <Textarea name="lyrics" onChange={handleLyricsChange} placeholder="type or paste lyrics here" s={12} style={{ maxHeight: "100px", overflowY: "scroll" }} />
                        </div>
                        <div>
                            <audio src={audioSrc} ref={audio} controls></audio>
                        </div>
                        <div style={{ height: "50px" }}>
                            <Button onClick={() => handleAudioPace("-")}>&lt;&lt; 2.0s</Button>
                            <Button onClick={() => handleAudioPace("+")}>&gt;&gt; 2.0s</Button>
                        </div>
                        <div>
                            <Button onClick={() => editTimestamp("add")}>add timestamp</Button>
                            <Button onClick={() => editTimestamp("remove")}>remove timestamp</Button>
                            <Button onClick={() => setIndex(index > 0 ? index = index - 1 : index = 0)}>previous line</Button>
                            <Button onClick={() => setIndex(index = index + 1)}>next line</Button>
                            <Button onClick={clearAll}>clear all timestamps</Button>
                        </div>
                        <div style={{ overflowY: "scroll", height: "250px" }}>{lyrics.map((lyrics, i) => i === index ? <p key={i} style={{ backgroundColor: "beige" }}>{lyrics}</p> : <p key={i}>{lyrics}</p>)}</div>
                        <Button onClick={() => setRedirectPage(<Redirect to={`/api/session/${id}`} />)}>Skip</Button>
                        <Button onClick={uploadFile}> Upload and Start Session</Button>
                        <Button
                            onClick={() => (setLyricsFile({ ...lyricsFile, len: lyricsFile.file.length }))}
                        > Back to Lyrics List</Button>
                    </>
            }
            {redirectPage}
        </Container >
    )

}
