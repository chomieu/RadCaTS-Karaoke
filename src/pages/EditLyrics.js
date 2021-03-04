import React, { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { Button, Container, Textarea } from 'react-materialize';
import Header from "../components/Header";
import API from "../utils/API";
import "../App.css"

export default function EditLyrics({ userData, setUserData, sessionData, setSessionData, setIsPlaying }) {

    const [message, setMessage] = useState(`loading . . .`)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [redirectPage, setRedirectPage] = useState()
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
                    hostId: data.data.host,
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
                setMessage('we\'re sorry, \nsomething went wrong  :\'(')
                setLoading(false)
                setError(true)
                console.log(err)
            })
    }

    useEffect(() => {
        startSession();
        setLyrics([]);
    }, [])

    const handleSkip = () => {
        setRedirectPage(<Redirect to={`/api/session/${id}`} />)
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
            const creatorFile = lyricsFile.file.find(file => file.creator._id === sessionData.hostId)
            if (creatorFile) {
                API.updateLyrics(lyricsData)
                    .then(data => {
                        applyLyrics(data.data._id)
                    })
                    .catch(err => {
                        console.log("lyrics update err:", err)
                    })
            } else {
                console.log("144 else")
                API.uploadLyrics(lyricsData)
                    .then(data => {
                        applyLyrics(data.data._id)
                    })
                    .catch(err => {
                        console.log("lyrics upload err:", err)
                    })
            }
        }
    }

    const applyLyrics = (lyricsId) => {
        const data = {
            sessionId: id,
            lyricsId: lyricsId
        }
        API.addLyricsToSession(data)
            .then(() => {
                console.log("add lyrics to session")
                setRedirectPage(<Redirect to={`/api/session/${id}`} />)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Container className="pageContents">
            <Header userData={userData} setUserData={setUserData} setIsPlaying={setIsPlaying} />
            {lyricsFile.len === 0 ?
                <div>
                    <h1>Lyrics List</h1>
                    <Container>
                        <h2>No lyrics avaliable</h2>
                    </Container>
                    <Button onClick={() => (setLyricsFile({ ...lyricsFile, len: -1 }))}>Make My Own Lyrics</Button>
                </div>
                : lyricsFile.len > 0 ?
                    <div>
                        <h1>Lyrics List</h1>
                        <Container style={{ height: "400px", overflowY: "scroll" }}>
                            {lyricsFile.file.map((file, i) => (<Button key={i} data-lrc={file._id} onClick={(e) => applyLyrics(e.target.dataset.lrc)}>{file.associatedSong.name} - {file.associatedSong.artist} BY {file.creator.username}</Button>))}
                        </Container>
                        <Button onClick={() => (setLyricsFile({ ...lyricsFile, len: -1 }))}>Make My Own Lyrics</Button>
                    </div>
                    : lyricsFile.len === -1 ?
                        <div>
                            <h1>Lyrics Editor Tool</h1>
                            <div>
                                <Textarea name="lyrics" onChange={handleLyricsChange} placeholder="type or paste lyrics here" s={12} style={{ maxHeight: "80px", overflowY: "scroll" }} />
                            </div>

                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40px" }}>
                                <audio src={audioSrc} ref={audio} controls></audio>
                                <Button className="btns-lyrics" onClick={() => handleAudioPace("-")}>&lt;&lt; 2.0s</Button>
                                <Button className="btns-lyrics" onClick={() => handleAudioPace("+")}>&gt;&gt; 2.0s</Button>
                            </div>
                            <div>
                                <Button className="btns-lyrics" onClick={() => editTimestamp("add")}>add timestamp</Button>
                                <Button className="btns-lyrics" onClick={() => editTimestamp("remove")}>remove timestamp</Button>
                                <Button className="btns-lyrics" onClick={() => setIndex(index > 0 ? index = index - 1 : index = 0)}>previous line</Button>
                                <Button className="btns-lyrics" onClick={() => setIndex(index = index + 1)}>next line</Button>
                                <Button className="btns-lyrics" onClick={clearAll}>clear all timestamps</Button>
                            </div>
                            <div style={{ overflowY: "scroll", height: "250px" }}>{lyrics.map((lyrics, i) => i === index ? <p key={i} style={{ backgroundColor: "beige" }}>{lyrics}</p> : <p key={i}>{lyrics}</p>)}</div>
                            <Button className="btns-lyrics" onClick={handleSkip}>Skip</Button>
                            <Button className="btns-lyrics" onClick={uploadFile}> Upload and Start Session</Button>
                            <Button
                                onClick={() => (setLyricsFile({ ...lyricsFile, len: lyricsFile.file.length }))}
                            > Back to Lyrics List</Button>
                        </div>
                        : ""
            }
            {redirectPage}
        </Container >
    )
}
