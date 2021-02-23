import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import LyricsContainer from "./LyricsContainer"
import Timer from "./Timer"



export default function SpeechContainer({ timer, isActive, setIsActive }) {

    // store user mic inputs here with timestamp
    // Note: time is at time of printing, not time of recording start
    const [userInput, setUserInput] = useState([{ time: 0 }])


    // deconstructed properties needed from the WebSpeechAPI / react-speech-recognition
    const {
        finalTranscript,
        resetTranscript,
        listening
    } = useSpeechRecognition()


    useEffect(() => {
        if (finalTranscript !== '') {

            // make copy of 'userInput', collect new data object and add to copy.
            var copy = [...userInput]
            var thisInput = {}
            copy[copy.length - 1].vocals = finalTranscript
            thisInput.time = timer
            thisInput.vocals = null
            copy.push(thisInput)

            // set updated copy as new state
            setUserInput(copy)

            // empty the 'finalTranscript' container.
            resetTranscript()
        }
    }, [finalTranscript])


    // turn mic off when 'isAvctive' is set to false
    useEffect(() => {
        if (!isActive) { handleStopKaraoke() }
    }, [isActive])


    // when start button is clicked
    const handleStartKaraoke = () => {

        // turn  mic on, listen continuously, listen for english
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB'
        })

        // set 'isActive' to true to trigger the start of other events.
        setIsActive(true)
    };

    // when stop button is clicked
    const handleStopKaraoke = () => {
        SpeechRecognition.stopListening()
        setIsActive(false)
    }

    // Note: Browser support is limited with WebSpeechAPI.
    // if the browser is not supported, alert user.
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (<h3>Your browser does not support speech recognition software! Sorry for the trouble, try Chrome desktop.</h3>)


        // content to load if browser is supported
    } else {
        return (
            <div>
                <div className="row left-align">
                    <div className="card z-depth-5">
                        <div className="card-content">

                            <LyricsContainer
                                timer={timer}
                                isActive={isActive}
                                userInput={userInput}
                                setIsActive={setIsActive}
                            />

                            <div className="row">
                                <div className="col s5">
                                    <p className="left-align"><Timer timer={timer} /></p>
                                </div>
                                <div className="col s5 right-align">
                                    <p className="right-align">pts: 0</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="row">

                    <h5>Mic: {listening ? 'on' : 'off'}</h5>

                    <button
                        className="btn start z-depth-5"
                        // disabled={isActive}
                        type="button"
                        onClick={handleStartKaraoke}>Start
                    </button>

                    <button
                        className="btn stop z-depth-5"
                        // disabled={!isActive}
                        type="button"
                        onClick={handleStopKaraoke}>Stop
                    </button>

                </div>
            </div>
        )
    }
}
