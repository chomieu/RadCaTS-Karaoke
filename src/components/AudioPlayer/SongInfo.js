// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from 'react';


function Song({ songName, songArtist }) {

    return (
        <div className="container">
            <div className="row mb1">
                <div className="col s12 song">
                    <h1 className="song__title">{songName}</h1>
                    <div className="divider"></div>
                    <h2 className="song__artist">{songArtist}</h2>
                </div>

            </div>
        </div>
    )
}

export default Song;