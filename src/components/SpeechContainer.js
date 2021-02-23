import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import LyricsContainer from "./LyricsContainer"
import Timer from "./Timer"



export default function SpeechContainer({ timer, isActive, setIsActive }) {

    const [message, setMessage] = useState('');
    const [userInput, setUserInput] = useState([{ time: 0 }])


    // commands need to be an object in an array
    const commands = [{
        command: 'stop karaoke', callback: ({ command }) => {
            SpeechRecognition.stopListening()
            setMessage(command)
        }
    }]

    const {
        finalTranscript,
        resetTranscript,
        listening
    } = useSpeechRecognition({ commands });


    useEffect(() => {
        if (finalTranscript !== '') {
            // copy current state
            let copy = [...userInput]
            // temporary container
            var thisInput = {}
            // add this phrase to the previous index position as 'vocals'.
            copy[copy.length - 1].vocals = finalTranscript
            // save the seconds in the object cointainer
            thisInput.time = timer
            // add object to the copy
            copy.push(thisInput)
            // update userInput state with the new copy.
            setUserInput(copy)
            // empty the finalTranscript' container.
            resetTranscript()
        }
    }, [finalTranscript]);


    // turn mic off when song ends
    useEffect(() => {
        if (!isActive) { handleStopClick() }
    }, [isActive])


    const handleStartClick = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
        setIsActive(true)
    };

    const handleStopClick = () => {
        SpeechRecognition.stopListening()
        setIsActive(false)
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (<h3>Your browser does not support speech recognition software! Sorry for the trouble, try Chrome desktop :)</h3>);
    } else {

        return (
            <div>
                <div className="row left-align">
                    <div className="col s12">
                        <div className="card z-depth-5">
                            <div className="card-content">
                                <LyricsContainer
                                    timer={timer}
                                    isActive={isActive}
                                    setIsActive={setIsActive}
                                    userInput={userInput}
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
                </div>

                <div className="row">
                    <div className="col s12">

                        <h5>Mic: {listening ? 'on' : 'off'}</h5>
                        <button
                            className="btn start z-depth-5"
                            // disabled={isActive}
                            type="button"
                            onClick={handleStartClick}>Start
                        </button>

                        <button
                            className="btn stop z-depth-5"
                            // disabled={!isActive}
                            type="button"
                            onClick={handleStopClick}>Stop
                        </button>

                    </div>
                </div>
            </div>
        )
    };
};
