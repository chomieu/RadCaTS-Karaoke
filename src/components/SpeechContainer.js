import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



export default function SpeechContainer() {

    const [message, setMessage] = useState('');
    const [startTime, setStartTime] = useState('')
    const [userInput, setUserInput] = useState([])

    const commands = [
        { command: 'fire emoji', callback: () => setMessage('🔥') },
        { command: 'Hello', callback: () => setMessage('Hi there!') },
        { command: 'reset', callback: () => resetTranscript() },
        {
            command: 'The weather is :condition today',
            callback: (condition) => setMessage(`You said it's ${condition} today`)
        },
        {
            command: 'Beijing',
            callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
            // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2
        },
    ]

    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition({ commands });


    useEffect(() => {
        if (startTime === '') {

        }
    }, [listening]);



    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('final:', finalTranscript);
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


    const mockTimeStamps = () => {
        let x = new Date()
        let y = Math.floor((startTime - x) / 1000) * -1
        setUserInput([...userInput, { time: y }])
        console.log(userInput)
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (<h3>Your browser does not support speech recognition software! Try Chrome desktop.</h3>);
    } else {

        return (
            <div>
                <div>
                    <h5>Mic: {listening ? 'on' : 'off'}</h5>

                    <div>
                        <button type="button" onClick={handleStartClick}>Start</button>
                        <button type="button" onClick={mockTimeStamps}>Mock time Stamp</button>
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
