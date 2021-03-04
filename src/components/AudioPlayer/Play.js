// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import { PlayCircleFilled } from "@material-ui/icons";


export default function Play({ handleClick, handlePlaySound, setStart, hidePlayBtn }) {
    const clickEvent = (e) => {
        handleClick()
        handlePlaySound()
        console.log("clicked")
    }

    return (
        <div>
            <button onClick={() => setStart(true)}>Ready</button>
            <button
                style={{display: hidePlayBtn}}
                className="player__button"
                onClick={clickEvent}>
                <PlayCircleFilled
                    style={{ fontSize: 70 }}
                />
            </button>
        </div>
    );
}