// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import { PlayCircleFilled } from "@material-ui/icons";


export default function Play(props) {
    const { handleClick } = props;

    return (
        <button
            className="player__button"
            onClick={() => handleClick()}>
            <PlayCircleFilled
                style={{ fontSize: 70 }}
            />
        </button>
    );
}