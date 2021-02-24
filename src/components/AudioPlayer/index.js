// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React, { useEffect } from 'react';
import Audio from "./Audio";
import './style.css'


function AudioPlayer() {

    return (
        <div className="audioPlayer">
            <Audio />
        </div>
    );
}

export default AudioPlayer;