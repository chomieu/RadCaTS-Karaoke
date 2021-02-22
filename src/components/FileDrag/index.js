import React, { useState, useEffect } from "react";
import "./style.css";
import Test from "./js/test";
import jDataView from "./js/jDataView";

function FileDrag() {

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = Test;
    //     script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);

    return (
        <div className="main">
            <p>Do you like Karaoke? Take a music file and drag it here. If you are lucky, you will listen the song without vocals.</p>
    
            <div id="filedrag">Drop your MP3 file here (also .ogg or .wav)</div>
            <div id="fileselect-container">
                <label htmlFor="fileselect">Or select a file:</label>
                <input type="file" id="fileselect" name="fileselect[]"/>
            </div>
    
            <div id="current-song"></div>
            <div id="options">
                Options:
                <button id="disable-filter">Disable karaoke</button>
            </div>
    
            <p>
                If you don't have any file at hand, <a id="demo-audio" href="#"><strong>click here for a demo</strong></a> of <a href="http://www.jamendo.com/en/track/1074874/happy">Happy by MMO</a>.
            </p>
    
            <h2>How it works</h2>
            <p>
                By using the Web Audio Javascript API, the file is processed locally in your browser and voice is removed. Check out the <a href="https://github.com/JMPerez/karaoke">project on Github</a> for more information. No Flash was used to develop this.
            </p>
        </div>
    )
}

export default FileDrag;