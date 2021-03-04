import React, { useEffect, useState } from "react"
// import track from "../../utils/lyrics.json"
import "./style.css"



function LyricsContainer({ curTime, isPlaying, lyrics, pts, setPts, userInput, duration, formatDuration, handleStop }) {

    // track the index location of the current lyrics object
    const [lrcIdx, setLrcIdx] = useState(0)
    // // container for the previous lyric object to check for pts
    const [lrcObj0, setLrcObj0] = useState({ time: 0, text: '' })
    // container for the current index lyric object
    const [lrcObj1, setLrcObj1] = useState({ time: 0, text: '' })

    const [displayLyrics, setDisplayLyrics] = useState([])

    const [ptsIdx, setPtsIdx] = useState({ idx: 1 })

    useEffect(() => {

        setDisplayLyrics(lyrics.lyrics)

    }, [lyrics.isLoaded])

    useEffect(() => {

        if (Math.floor(curTime) === Math.floor(duration)) { handleStop() }

        if (lyrics.isLoaded && curTime) {

            // if session is active and curTime is 0, start the first set of lyrics
            if (curTime === 0) {

                setLrcObj0(displayLyrics[lrcIdx])
                setLrcObj1(displayLyrics[lrcIdx + 1])

                // if session is active & curTime matches the time of the next object, access the nested conditional.
            } else if (Math.floor(curTime) === Math.floor(lrcObj1.time)) {

                setLrcObj0(displayLyrics[lrcIdx])
                setLrcObj1(displayLyrics[lrcIdx + 1])
                setLrcIdx(lrcIdx + 1)

            }

            if (lrcIdx === displayLyrics.length - 1) {
                setLrcObj0({ text: 'Thanks for playin\'' })
                setLrcObj1({ text: 'End lyrics' })
            }
        }

    }, [isPlaying, curTime])


    // update points based on new user input
    // make sure there are entries from user to avoid errors
    // create array of words from user input
    // concatinate the current lyrics with the last lyrics, check if any user input matches any words

    useEffect(() => {


        if (userInput.length > 1) {

            // const lastMicInputTime = userInput[userInput.length - 2].time
            const microphoneInput = userInput[userInput.length - 2].text.split(' ')
            const micInputEndTime = userInput[userInput.length - 1].time
            var points = pts.pts

            var possibleLyrics = []
            var idxIncrement = 0

            displayLyrics.map((line, idx) => {

                // where to start looking for lyrics
                if (idx >= ptsIdx.idx) {

                    // where to stop looking
                    if (line.time < micInputEndTime) {
                        idxIncrement++
                        let words = line.text.split(' ')
                        words.map(x => { possibleLyrics.push(x) })
                    }
                }
            })

            setPtsIdx({ idx: idxIncrement })

            console.log(possibleLyrics)
            console.log(microphoneInput)

            // Possible solution to "cheat" issue with repeated words racking up points.
            // Test when Chomie and Rita have sessions working.
            possibleLyrics.map(word => {
                let index = microphoneInput.indexOf(word);
                if (index > -1) {
                    console.log(`Matched: ${word} === ${microphoneInput[index]} || Points: ${points + 1}`)
                    microphoneInput.splice(index, 1);
                    points++;
                }
            })

            setPts({ pts: points })
        }
    }, [userInput])

    return (
        <div className="center-align">

            <div className="row">
                <h4>{displayLyrics ? lrcObj0.text : '-'}</h4>
            </div>

            <div className="divider"></div>

            <div className="row">
                <h6 className="muted">{displayLyrics ? lrcObj1.text : '-'}</h6>
            </div>

        </div>
    )
}

export default LyricsContainer;