import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import LyricsContainer from "../LyricsContainer/"
import "./style.css"


function KaraokeBox({ curTime, playing, pts, setPts, language, sessionData }) {

    // store mic recordings here with timestamp
    // Note: time is at time of printing, not time of recording start
    const [userInput, setUserInput] = useState([
        { time: 0 }
    ])

    // deconstructed properties needed from the WebSpeechAPI / react-speech-recognition
    const {
        finalTranscript,
        resetTranscript,
        listening
    } = useSpeechRecognition()

    // activate / deactivate mic when play/pause is clicked
    useEffect(() => {
        if (playing) { activateMic(language) }
        else { SpeechRecognition.stopListening() }
    }, [playing])


    useEffect(() => {
        if (finalTranscript !== '') {

            // visual of the object array stored in userInput.
            // tracks recordings throughout the karaoke session.
            // time value comes from the curTime (song time position from AudioPlayer), as a whole number

            // [{
            //     time: 0 //start time
            //     vocals: 'recording 1'
            // },
            // {
            //     time: 10, // time that 'recording 1' printed
            //     vocals: null // end of session
            // }]

            // make copy of 'userInput', collect new data object and add to copy.
            var copy = [...userInput]
            var thisRec = {}
            copy[copy.length - 1].vocals = finalTranscript
            thisRec.time = Math.floor(curTime)
            thisRec.vocals = null
            copy.push(thisRec)
            // set updated copy as new state
            setUserInput(copy)
            // empty the 'finalTranscript' container.
            resetTranscript()
        }
    }, [finalTranscript])




    // when start button is clicked
    const activateMic = (x) => {
        SpeechRecognition.startListening({ continuous: true, language: x })
        // set 'playing' to true to trigger the start of other events.
    };


    // Note: Browser support is limited with WebSpeechAPI.
    // if the browser is not supported, alert user.
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (<h3>Your browser does not support speech recognition software! Sorry for the trouble, try Chrome desktop.</h3>)
        // content to load if browser is supported
    } else {
        return (
            <div className="row player left-align">
                <div className="col s12">

                    <LyricsContainer
                        pts={pts.pts}
                        setPts={setPts}
                        curTime={curTime}
                        playing={playing}
                        sessionData={sessionData}
                        userInput={userInput}
                    />

                    {/* <h5>Mic: {listening ? 'on' : 'off'}</h5> */}
                </div>
            </div>
        )
    }
}

export default KaraokeBox;