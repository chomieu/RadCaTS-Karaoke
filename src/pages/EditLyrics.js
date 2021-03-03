import React, { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from "react-router-dom";

import { Button } from 'react-materialize';
import API from "../utils/API";

export default function EditLyrics({ sessionData, setSessionData }) {
    const [loading, setLoading] = useState(true)
    const [redirectPage, setRedirectPage] = useState();
    const { id } = useParams();
    const data = useParams();
    const [lyrics, setLyrics] = useState([]);
    const [audioSrc, setAudioSrc] = useState();
    let [index, setIndex] = useState(0);
    const audio = useRef(null);

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
                    lyrics: [`[ti:${data.data.karaokeSong.name}]`, `[ar:${data.data.karaokeSong.artist}]`]
                })
                setAudioSrc(sessionData.mixed);
                console.log(sessionData)
                setTimeout(() => { setLoading(false) }, 5000)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    const getLyrics = () => {
        API.getLyricsBySong(sessionData.songId)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        startSession();
        getLyrics();
    }, [])

    const handleSkip = () => {
        setRedirectPage(<Redirect to={`/api/session/${sessionData.sessionId}`} />)
    }

    const handleLyricsChange = (e) => {
        setLyrics(e.target.value.split("\n"));
        setAudioSrc(sessionData.mixed);
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
        console.log(lyricsData)
        API.uploadLyrics(lyricsData)
            .then(() => {
                console.log("lyrcis uploaded")
            })
            .catch(err => {
                console.log("lyrics upload err:", err)
            })
    }

    return (
        <div>
            <h1>Lyrics Editor Tool</h1>
            {/* <input type="file" accept=".txt,.lrc" onChange={handleAudio} /> */}
            <form>
                <textarea name="lyrics" onChange={handleLyricsChange} placeholder="type or paste lyrics here"></textarea>
            </form>
            <div>
                <audio src={audioSrc} ref={audio} controls></audio>
            </div>
            <div>
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
            <div>{lyrics.map((lyrics, i) => i === index ? <p key={i} style={{ backgroundColor: "beige" }}>{lyrics}</p> : <p key={i}>{lyrics}</p>)}</div>
            <Button onClick={uploadFile}> Upload </Button>
            <Button
                onClick={handleSkip}
            >Skip Lyrics</Button>
            {redirectPage}

        </div>
    )
}
