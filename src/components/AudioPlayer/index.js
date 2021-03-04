// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React, { useState, useEffect } from "react";
import momentDurationFormatSetup from "moment-duration-format";
import useAudioPlayer from "./useAudioPlayer";
import AudioBottom from "./AudioBottom";
import KaraokeBox from "../KaraokeBox";
import Bar from "./Bar"
import AudioTop from "./AudioTop";
import moment from "moment";
import "./style.css"


function AudioPlayer({ sessionData, isPlaying, setIsPlaying, handlePlaySound, setStart, audio, lyrics }) {

    const { curTime, duration, setClickedTime } = useAudioPlayer(isPlaying, setIsPlaying, audio);
    const [language, setLanguage] = useState('en-Us')
    const [pts, setPts] = useState({ pts: 0 })

    const formatDuration = (duration) => {
        return moment
            .duration(duration, "seconds")
            .format("mm:ss", { trim: false });
    }

    const handlePlay = () => {

        console.log('isPlaying', true)
        setIsPlaying(true)
    }

    const handleStop = () => {

        console.log('isPlaying', false)
        setIsPlaying(false)

    }

    return (
        <div className="container">

            <AudioTop
                sessionData={sessionData}
            />

            <KaraokeBox
                pts={pts}
                lyrics={lyrics}
                setPts={setPts}
                curTime={curTime}
                duration={duration}
                language={language}
                isPlaying={isPlaying}
                sessionData={sessionData}
                formatDuration={formatDuration}
                handleStop={handleStop}
            />

            <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
            {/* <span className="bar__time">{formatDuration(curTime)} / {formatDuration(duration)}</span> */}

            <AudioBottom
                sessionData={sessionData}
                handlePlay={handlePlay}
                isPlaying={isPlaying}
                curTime={curTime}
                pts={pts}
                handlePlaySound={handlePlaySound}
                setStart={setStart}
            />

        </div>
    );
}

export default AudioPlayer;