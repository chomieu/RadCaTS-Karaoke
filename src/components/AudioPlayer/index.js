// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React, { useState, useEffect } from "react";
import AudioBottom from "./AudioBottom";
import KaraokeBox from "../KaraokeBox";
import AudioTop from "./AudioTop";
import "./style.css"


function AudioPlayer({ userData, setUserData, sessionData, playing, setPlaying, curTime, duration, formatDuration, }) {

    const [pts, setPts] = useState({ pts: 0 })
    const [language, setLanguage] = useState('en-Us')


    const handlePlay = () => { setPlaying(true) }
    const handlePause = () => { setPlaying(false) }




    return (
        <div className="container">
            <AudioTop
                sessionData={sessionData}
            />

            {/* <FileDrop playing={ playing } /> */}

            <KaraokeBox
                pts={pts}
                setPts={setPts}
                curTime={curTime}
                playing={playing}
                language={language}
                sessionData={sessionData}
            />

            {/* <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} /> */}
            <AudioBottom

                formatDuration={formatDuration}
                sessionData={sessionData}
                handlePause={handlePause}
                handlePlay={handlePlay}
                duration={duration}
                playing={playing}
                curTime={curTime}
                pts={pts}

            />


        </div>
    );
}

export default AudioPlayer;