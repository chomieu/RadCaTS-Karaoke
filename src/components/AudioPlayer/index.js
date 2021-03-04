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


function AudioPlayer({ sessionData, isPlaying, setIsPlaying, handlePlaySound, start, setStart, audio, pts, setPts, lyrics, hidePlayBtn }) {

    const { curTime, duration, setClickedTime } = useAudioPlayer(isPlaying, setIsPlaying, audio);
    const [language, setLanguage] = useState('en-Us')

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
                handleStop={handleStop}
                sessionData={sessionData}
                formatDuration={formatDuration}
            />

            {/* <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} /> */}
            {/* <span className="bar__time">{formatDuration(curTime)} / {formatDuration(duration)}</span> */}

            <AudioBottom
                handlePlaySound={handlePlaySound}
                sessionData={sessionData}
                handlePlay={handlePlay}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                curTime={curTime}
                pts={pts}
                handlePlaySound={handlePlaySound}
                start={start}
                setStart={setStart}
                hidePlayBtn={hidePlayBtn}
            />

        </div>
    );
}

export default AudioPlayer;