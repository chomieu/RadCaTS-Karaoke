// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import { PlayCircleFilled } from "@material-ui/icons";


export default function Play({ handleClick, handlePlaySound, setStart }) {
    const clickEvent = () => {
        handleClick()
        handlePlaySound()
    }

    return (
        <div>
            <button onClick={() => setStart(true)}>Ready</button>
            <button
                className="player__button"
                onClick={clickEvent}>
                <PlayCircleFilled
                    style={{ fontSize: 70 }}
                />
            </button>
        </div>
    );
}