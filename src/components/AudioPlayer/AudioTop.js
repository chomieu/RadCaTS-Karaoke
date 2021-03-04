// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import SongInfo from "./SongInfo"



function AudioTop({ sessionData }) {

    return (
        <div className="row player top">
            <div className="col s12">
                <SongInfo songName={sessionData.songName} songArtist={sessionData.artist} />
            </div>
        </div>
    );
}

export default AudioTop;