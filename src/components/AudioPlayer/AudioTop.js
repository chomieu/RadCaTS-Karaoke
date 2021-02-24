// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import Song from "./Song"


function AudioTop({ song }) {

    return (

        <div className="row player top">
            <div className="col s12">
                <audio id="audio">
                    <source src={song.file} />
                    <p>Your browser does not support the <code>audio</code> element.</p>
                </audio>

                <Song songName={song.track} songArtist={song.artist} />
            </div>
        </div>

    );
}

export default AudioTop;