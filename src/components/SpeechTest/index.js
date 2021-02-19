import React, { useState } from "react"
import { recognizer } from "microsoft-cognitiveservices-speech-sdk"
import SpeechSDK from "../../SpeechSDK-JavaScript-1.15.1 2/microsoft.cognitiveservices.speech.sdk.bundle"

export default function speechTest() {
    const details = 'fb93d2a3ff9e4400b9049a38dec189b2'
    const region = 'westus'

    // Use the subscription key and configure the SpeechSDK object provided by the file referenced in the index.html file.
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(details, region);

    // Set speech recognition language to US English
    speechConfig.speechRecognitionLanguage = "en-US"

    // Add the user's microphone input
    var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

    // Create the SpeechRecognizer object
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    // Start the voice recognition method. May need to replace with StartContinuousRecognitionAsync later on for more prolonged recognition
    recognizer.recognizeOnceAsync(

        // If we're successful.
        function (result) {
            // Make the button to start speech recognition work again.
            // $("#recordVoicelyBtn").prop("disabled", false)
            // Voicesearch takes the text results and the full list of emojis as arguments.
            voiceSearch(result.privText, emojiList);
            window.console.log(result)

            // Close the SpeechRecognizer object, and set the variable to undefined.
            recognizer.close();
            recognizer = undefined;
        },
        // If there's an error.
        function (err) {
            // Also sets the button to work again.
            // $("#recordVoicelyBtn").prop("disabled", false)
            // Add the error to the div that spells out text
            // $("#phraseDiv").text(err)
            // log error to the console.
            window.console.log(err);

            // Close the SpeechRecognizer object, and set the variable to undefined.
            recognizer.close();
            recognizer = undefined;
        }
    )

    return (

        <div className="container" id="content">
            <div className="row">
                <h4>Microsoft Cognitive Services Speech SDK JavaScript Quickstart</h4>
                <hr />
                <br />
                <div className="row">
                    <button id="startRecognizeOnceAsyncButton">Start recognition</button>
                </div>
                <div className="row">
                    <p>Results</p>
                    <textarea id="phraseDiv" />
                </div>
            </div>
        </div>
    )
}