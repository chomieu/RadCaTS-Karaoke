import React, { useEffect, useState } from "react"
import track from "../../utils/lyrics.json"
import "./style.css"



function LyricsContainer({ curTime, isPlaying, userInput, pts, setPts }) {

    // track the index location of the current lyrics object
    const [lrcIdx, setLrcIdx] = useState({ idx: 1 })
    // // container for the previous lyric object to check for pts
    const [lrcObj0, setLrcObj0] = useState({ time: 0, lyrics: '' })
    // container for the current index lyric object
    const [lrcObj1, setLrcObj1] = useState({ time: 0, lyrics: '' })
    // container for the next index lyric object 
    const [lrcObj2, setLrcObj2] = useState({ time: 0, lyrics: '' })


    const [ptsIdx, setPtsIdx] = useState({ idx: 1 })



    useEffect(() => {

        // if session is active and curTime is 0, start the first set of lyrics
        if (isPlaying && curTime === 0) {
            setLrcObj1(track[lrcIdx.idx])
            setLrcObj2(track[lrcIdx.idx + 1])

            // if session is active & curTime matches the time of the next object, access the nested conditional.
        } else if (isPlaying && Math.floor(curTime) === lrcObj2.time) {
            // Note: the last set of lyrics are set to null.
            // if there are lyrics, load them.
            if (lrcObj2.lyrics) {
                let x = lrcIdx.idx + 1
                setLrcObj0(track[x - 1])
                setLrcObj1(track[x])
                setLrcObj2(track[x + 1])
                setLrcIdx({ idx: x })
            }
        }

    }, [isPlaying, curTime])


    // update points based on new user input
    // make sure there are entries from user to avoid errors
    // create array of words from user input
    // concatinate the current lyrics with the last lyrics, check if any user input matches any words

    useEffect(() => {

        if (userInput.length > 1) {

            const lastMicInputTime = userInput[userInput.length - 2].time
            const microphoneInput = userInput[userInput.length - 2].vocals.split(' ')
            const micInputEndTime = userInput[userInput.length - 1].time
            var points = pts

            var possibleLyrics = []
            var idxIncrement = 0
            console.log(micInputEndTime)

            track.map((line, idx) => {

                // where to start looking for lyrics
                if (idx >= ptsIdx.idx) {

                    // where to stop looking
                    if (line.time < micInputEndTime) {
                        idxIncrement++
                        let words = line.lyrics.split(' ')
                        words.map(x => { possibleLyrics.push(x) })
                    }
                }
            })

            setPtsIdx({ idx: idxIncrement })
            console.log(possibleLyrics)
            console.log(microphoneInput)

            possibleLyrics.map( word => {
                let index = microphoneInput.indexOf( word );
                if ( index > -1 ) {
                    microphoneInput.splice( index, 1 );
                    points++;
                }
            })

            // Possible solution to "cheat" issue with repeated words racking up points.
            // Test when Chomie and Rita have sessions working.
            // possibleLyrics.map( word => {
            //     let index = microphoneInput.indexOf( word );
            //     if ( index > -1 ) {
            //         microphoneInput.splice( index, 1 );
            //         points++;
            //     }
            // })


            setPts({ pts: points })
        }
    }, [userInput])





    return (
        <div className="center-align">

            <div className="row">
                <h4>{isPlaying ? lrcObj1.lyrics : '-'}</h4>
            </div>

            <div className="divider"></div>

            <div className="row">
                <h6 className="muted">{isPlaying ? lrcObj2.lyrics : '-'}</h6>
            </div>

        </div>
    )
}

export default LyricsContainer;