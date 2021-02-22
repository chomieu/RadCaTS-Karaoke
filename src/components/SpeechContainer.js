import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



export default function SpeechContainer() {

    const [message, setMessage] = useState('');
    const [startTime, setStartTime] = useState('')
    const [userInput, setUserInput] = useState([{ time: 0 }])


    // commands need to be an object in an array
    const commands = [{
        command: 'stop karaoke', callback: ({ command }) => {
            SpeechRecognition.stopListening()
            setMessage(command)
        }
    }]

    const {
        transcript,
        interimTranscript,
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
            let secondsAfterStart = Math.floor((startTime - new Date()) / 1000) * -1
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
        if (startTime === '') {
            setStartTime(new Date())
        }
    };

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (<h3>Your browser does not support speech recognition software! Sorry for the trouble, try Chrome desktop :)</h3>);
    } else {

        return (
            <div>
                <div>
                    <h5>Mic: {listening ? 'on' : 'off'}</h5>

                    <div>
                        <button type="button" onClick={handleStartClick}>Start</button>
                        <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
                    </div>
                </div>
                <br />
                <hr />
                <div>
                    <h4>command</h4>
                    {message}
                </div>
                <hr />
                <div>
                    <h4>transcript</h4>
                    <span>{transcript}</span>
                </div>
                <hr />
                <div>
                    <h4>interimTranscript</h4>
                    <span>{interimTranscript}</span>
                </div>
                <hr />
                <div>
                    <h4>finalTranscript</h4>
                    <span>{finalTranscript}</span>
                </div>
                <br />
                <hr />
                <button type="button" onClick={resetTranscript}>Reset</button>
            </div>
        );
    }
};
