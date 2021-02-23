import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import LyricsContainer from "./LyricsContainer"
import Timer from "./Timer"



export default function SpeechContainer({ timer, setTimer, setIsActive }) {

    const [message, setMessage] = useState('');
    const [timeAtStart, setTimeAtStart] = useState('')
    // const [startTimer, setIsActive] = useState(false)
    const [userInput, setUserInput] = useState([{ time: 0 }])


    // commands need to be an object in an array
    const commands = [{
        command: 'stop karaoke', callback: ({ command }) => {
            SpeechRecognition.stopListening()
            setMessage(command)
        }
    }]

    const {
        // transcript,
        // interimTranscript,
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
            // date right now - date at start (gives seconds after start)
            let secondsAfterStart = Math.floor((timeAtStart - new Date()) / 1000) * -1
            // add this phrase to the previous index position as 'vocals'.
            copy[copy.length - 1].vocals = finalTranscript
            // save the seconds in the object cointainer
            thisInput.time = secondsAfterStart
            // add object to the copy
            copy.push(thisInput)
            // update userInput state with the new copy.
            setUserInput(copy)
            // empty the finalTranscript' container.
            resetTranscript()
        }
    }, [finalTranscript]);


    const handleStartClick = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
        if (timeAtStart === '') {
            setTimeAtStart(new Date())
        }
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
            <div className="container">

                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <span>Lyrics</span>
                                <div className="divider"></div>
                                <br />
                                <LyricsContainer
                                    timer={timer}
                                />
                                <div className="divider"></div>
                                <br />
                                <p>Time: <Timer timer={timer} /></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">

                        <h5>Mic: {listening ? 'on' : 'off'}</h5>
                        <button
                            className="btn green"
                            type="button"
                            onClick={handleStartClick}>Start
                        </button>

                        <button
                            className="btn red"
                            type="button"
                            onClick={handleStopClick}>Stop
                        </button>

                    </div>
                </div>
            </div>
        )
    };
};
