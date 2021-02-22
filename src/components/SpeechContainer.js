import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



export default function SpeechContainer() {

    const [message, setMessage] = useState('');
    const [startTime, setStartTime] = useState('')
    const [userInput, setUserInput] = useState([{ time: 0 }])


    // // example of current workflow 
    // // each object has 2 key value pairs, time & vocals
    // let example = [{

    //     // start time preset to 0.
    //     time: 0, //seconds

    //     // created when first phrase is saved to 'finalTranscript' container. Then container is emptied for next phrase.
    //     // time of printing - time of 'startTime' is set as 'time' (seconds after start) for next index
    //     vocals: "phrase1"
    // },
    // {
    //     // Printed when phrase1 is saved to 'finalTranscript'.
    //     time: 10, //seconds

    //     // Printed when second phrase is saved to 'finalTranscript' container. Then container is emptied for next phrase.
    //     vocals: 'phrase2'
    // },
    // {
    //     // Printed when phrase2 is saved to 'finalTranscript'.
    //     time: 15, // 
    // }]



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
        listening
    } = useSpeechRecognition({ commands });


    // logs all of the vocal recordings with time checkpoints
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



    useEffect(() => {
        SpeechRecognition.onaudiostart = function () {
            console.log('Audio capturing started');
        }




        SpeechRecognition.onstart = () => {
            console.log('Speech has been detected');
        }
    }, [])


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
                        {/* <button type="button" onClick={mockTimeStamps}>Mock time Stamp</button> */}
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
