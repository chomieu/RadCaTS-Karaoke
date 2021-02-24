// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import useAudioPlayer from './useAudioPlayer';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import songTest from "../../utils/song/song.mp3"

const song = {
    artist: 'Mark Ronson ft. Bruno Mars',
    track: 'Uptown Funk',
    file: songTest
}


function Audio() {

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

            <div className="row player top">
                <div className="col s12">
                    <audio id="audio">
                        <source src={song.file} />
                        <p>Your browser does not support the <code>audio</code> element.</p>
                    </audio>

                    <Song songName={song.track} songArtist={song.artist} />
                </div>
            </div>

            <div className="row player middle">
                <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
            </div>

            <div className="row player bottom">
                <div className="col s6 right-align">
                    <span className="bar__time">{formatDuration(curTime)} / {formatDuration(duration)}</span>

                    <div className="right-align">
                        {playing
                            ? <Pause handleClick={handlePause} />
                            : <Play handleClick={handlePlay} />
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Audio;