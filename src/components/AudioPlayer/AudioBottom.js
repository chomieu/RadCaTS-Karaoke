// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import Play from "./Play";
import Pause from "./Pause";

function AudioBottom({ pts, isPlaying, handlePause, handlePlay, handlePlaySound, setStart }) {

    return (
        <>
            <div className="row player bottom">
                <div className="col s4 m3 l2 left-align points__container">
                    <h1 className="points">{pts.pts}</h1>
                    <div className="divider"></div>
                    <h3 className="points__label">score</h3>
                </div>


                <div className="col s8 m9 l10 right-align">

                    <div className="right-align">
                        <Play
                            handleClick={handlePlay}
                            handlePlaySound={handlePlaySound}
                            setStart={setStart}
                        />
                    </div>
                </div>
            </div>
        </>



    );
}

export default AudioBottom;