// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React, { useState, useEffect } from "react";
import momentDurationFormatSetup from "moment-duration-format";
import useAudioPlayer from "./useAudioPlayer";
import AudioBottom from "./AudioBottom";
import KaraokeBox from "../KaraokeBox";
import AudioTop from "./AudioTop";
import moment from "moment";
import "./style.css"


function AudioPlayer({ sessionData, setSessionData, isPlaying, setIsPlaying, handleFinish, handlePlaySound, start, setStart, audio, pts, setPts, lyrics, hidePlayBtn }) {

    const { curTime, duration, setClickedTime } = useAudioPlayer(isPlaying, setIsPlaying, audio);
    const [language, setLanguage] = useState('en-Us')

    const formatDuration = (duration) => {
        return moment
            .duration(duration, "seconds")
            .format("mm:ss", { trim: false });
    }

    useEffect(() => { console.log(pts.pts) }, [])

    const handlePlay = () => {
        setSessionData({ ...sessionData, isActive: true })
        setIsPlaying(true)
    }
    const handleStop = () => {
        setIsPlaying(false)
    }

    return (
        <div className="container">

            <AudioTop
                sessionData={sessionData}
            />

            {/* <FileDrop isPlaying={ isPlaying } /> */}

            <KaraokeBox
                pts={pts}
                lyrics={lyrics}
                setPts={setPts}
                curTime={curTime}
                isPlaying={isPlaying}
                handleStop={handleStop}
                duration={duration}
                language={language}
                sessionData={sessionData}
            />

            {/* <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} /> */}
            <AudioBottom
                formatDuration={formatDuration}
                sessionData={sessionData}
                handlePlay={handlePlay}
                duration={duration}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                curTime={curTime}
                pts={pts}
                handleFinish={handleFinish}
                handlePlaySound={handlePlaySound}
                start={start}
                setStart={setStart}
                hidePlayBtn={hidePlayBtn}
            />

        </div>
    );
}

export default AudioPlayer;