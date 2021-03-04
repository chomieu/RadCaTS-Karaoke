// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import { Button } from "react-materialize";
import { PlayCircleFilled } from "@material-ui/icons";


export default function Play({ handleClick, handlePlaySound, setStart, isPlaying, setIsPlaying }) {
    const clickEvent = (e) => {
        handleClick()
        handlePlaySound()
        console.log("clicked")
    }

    return (
        <div>
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