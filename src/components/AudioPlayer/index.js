// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React, { useState, useEffect } from "react";
import momentDurationFormatSetup from "moment-duration-format";
import useAudioPlayer from './useAudioPlayer';
import { Button } from "react-materialize"
import AudioBottom from "./AudioBottom";
import KaraokeBox from "../KaraokeBox";
import AudioTop from "./AudioTop";
import moment from "moment";
import "./style.css"
import API from "../../utils/API";



function AudioPlayer({ userData, setUserData, sessionData }) {

    const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();
    const [pts, setPts] = useState({ pts: 0 })
    const [language, setLanguage] = useState('en-Us')

    const formatDuration = (duration) => {
        return moment
            .duration(duration, "seconds")
            .format("mm:ss", { trim: false });
    }


    const handlePlay = () => { setPlaying(true) }
    const handlePause = () => { setPlaying(false) }
    const handleBack = () => { setPlaying(false) }

    const handleFinish = () => {
        setPlaying(false)

        const id = sessionData.sessionId
        console.log(id)
        const data = {
            token: userData.token,
            score: pts.pts
        }
        console.log(data)

        API.finishSession(id, data)
            .then(data => { console.log(data) })
            .catch(err => { console.log(err) })
    }

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
                pts={pts}
                curTime={curTime}
                playing={playing}
                duration={duration}
                sessionData={sessionData}
                setClickedTime={setClickedTime}
                formatDuration={formatDuration}
                handlePause={handlePause}
                handlePlay={handlePlay}
            />

            <Button
                onClick={handleBack}
            >Back
            </Button>
            <Button
                onClick={handleFinish}
            >Finish
            </Button>

        </div>
    );
}

export default AudioPlayer;