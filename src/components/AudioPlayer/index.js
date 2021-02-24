// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import useAudioPlayer from './useAudioPlayer';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import AudioTop from "./AudioTop"
import AudioBottom from "./AudioBottom"
import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import songTest from "../../utils/song/song.mp3"
import "./style.css"


const song = {
    artist: 'Mark Ronson ft. Bruno Mars',
    track: 'Uptown Funk',
    file: songTest
}


function AudioPlayer() {

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
            <AudioTop song={song} />
            <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
            <AudioBottom
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