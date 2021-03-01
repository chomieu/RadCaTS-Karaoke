// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import SongInfo from "./SongInfo"
import song from '../../utils/song/song.mp3'



function AudioTop({ sessionData }) {

    return (

        <div className="row player top">
            <div className="col s12">
                <audio id="audio">
                    <source src={song} />
                    <p>Your browser does not support the <code>audio</code> element.</p>
                </audio>



                {/* <audio controls id="">
                    <source src="" />
                    <p>Your browser does not support the <code>audio</code> element.</p>
                </audio> */}



                <SongInfo songName={sessionData.name} songArtist={sessionData.artist} />
            </div>
        </div>

    );
}

export default AudioTop;