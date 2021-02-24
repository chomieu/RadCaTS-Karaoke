// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React, { useState, useEffect } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import useAudioPlayer from './useAudioPlayer';
import "./style.css"

import Bar from "./Bar";
import AudioTop from "./AudioTop"
import AudioBottom from "./AudioBottom"
import KaraokeBox from "../KaraokeBox"

import songFile from "../../utils/song/song.mp3"


function AudioPlayer() {

    const [pts, setPts] = useState({ pts: 0 })
    const [language, setLanguage] = useState('en-Us')
    const [song, setSong] = useState({})

    useEffect(() => {
        let x = {
            artist: 'Mark Ronson ft. Bruno Mars',
            track: 'Uptown Funk',
            // file: songFile
        }
        setSong(x)
    }, [])


    const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

    const handlePlay = () => {
        setPlaying(true)
    }
    const handlePause = () => {
        setPlaying(false)
    }

    const formatDuration = (duration) => {
        return moment
            .duration(duration, "seconds")
            .format("mm:ss", { trim: false });
    }

    return (
        <div className="container">
            <AudioTop
                song={song}
                songFile={songFile}
            />

            <KaraokeBox
                pts={pts}
                setPts={setPts}
                curTime={curTime}
                playing={playing}
                language={language}
            />

            <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
            <AudioBottom
                pts={pts}
                curTime={curTime}
                playing={playing}
                duration={duration}
                setClickedTime={setClickedTime}
                formatDuration={formatDuration}
                handlePause={handlePause}
                handlePlay={handlePlay}
            />

        </div>
    );
}

export default AudioPlayer;