// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import Play from "./Play";
import Pause from "./Pause";

function AudioBottom({ pts, curTime, duration, playing, handlePause, handlePlay, formatDuration, sessionData }) {

    return (
        <>
            <audio
                controls
                id="audio"
                // autostart="0"
                src={sessionData.src}
            >
                {/* <source src="https://tinyurl.com/ycnjfay4" /> */}
                <p>Your browser does not support the <code>audio</code> element.</p>
            </audio>


            <div className="row player bottom">
                <div className="col s4 m3 l2 left-align points__container">
                    <h1 className="points">{pts.pts}</h1>
                    <div className="divider"></div>
                    <h3 className="points__label">score</h3>
                </div>


                <div className="col s8 m9 l10 right-align">
                    {/* <span className="bar__time">{formatDuration(curTime)} / {formatDuration(duration)}</span> */}

                    <div className="right-align">
                        {playing
                            ? <Pause handleClick={handlePause} />
                            : <Play handleClick={handlePlay} />
                        }
                    </div>
                </div>
            </div>
        </>



    );
}

export default AudioBottom;

// const sessionObj = {
//     hostId: data.data.host,
//     sessionId: data.data._id,
//     name: data.data.karaokeSong.name,
//     artist: data.data.karaokeSong.artist,
//     src: data.data.karaokeSong.mixed,
// }