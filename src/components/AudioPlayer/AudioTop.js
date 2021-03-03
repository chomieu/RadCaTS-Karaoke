// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import SongInfo from "./SongInfo"



function AudioTop({ sessionData }) {

    return (

        <div className="row player top">
            <div className="col s12">
                <audio id="audio">
                    {/* <source src={song.file} /> */}
                    <source src={sessionData.src} />
                    <p>Your browser does not support the <code>audio</code> element.</p>
                </audio>
                <SongInfo songName={sessionData.name} songArtist={sessionData.artist} />
            </div>
        </div>

    );
}

export default AudioTop;