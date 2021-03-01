import React, { useEffect, useState } from "react"
import { Button } from "react-materialize"
import "./style.css"



function LyricsContainer({ curTime, playing, userInput, pts, setPts, sessionData }) {

    // // container for the previous lyric object to check for pts
    const [lrcObj0, setLrcObj0] = useState({ time: 0, text: null })

    // container for the current index lyric object
    const [lrcObj1, setLrcObj1] = useState({ time: 0, text: null })

    // container for the next index lyric object 
    const [lrcObj2, setLrcObj2] = useState({ time: 0, text: null })

    // track the index location of the current lyrics object
    const [lrcIdx, setLrcIdx] = useState({ idx: 0 })

    // track index position of mic unput for pts calculating
    const [ptsIdx, setPtsIdx] = useState({ idx: 0 })

    const track = sessionData.lyrics

    const [shift, setShift] = useState(0)


    useEffect(() => {

        // console.log(Math.floor(curTime))
        // if session is active and curTime is 0, start the first set of lyrics
        if (playing && curTime < .1) {

            console.log('start')
            console.log(track[lrcIdx.idx])

            setLrcObj1(track[lrcIdx.idx])
            setLrcObj2(track[lrcIdx.idx + 1])

            // if session is active & curTime matches the time of the next object, access the nested conditional.
        } else if (playing && Math.floor(curTime) === Math.floor(lrcObj2.time) + shift) {
            // Note: the last set of lyrics are set to null.
            // if there are lyrics, load them.

            // console.log('shift')
            // console.log(track[lrcIdx.idx])

            if (lrcObj2.text) {
                let x = lrcIdx.idx + 1
                setLrcObj0(track[x - 1])
                setLrcObj1(track[x])
                setLrcObj2(track[x + 1])
                setLrcIdx({ idx: x })
            }
        }

    }, [playing, curTime])


    // update points based on new user input
    // make sure there are entries from user to avoid errors
    // create array of words from user input
    // concatinate the current lyrics with the last lyrics, check if any user input matches any words

    useEffect(() => {

        // if user has started singing
        if (userInput.length > 1) {

            const recording = userInput[userInput.length - 2].vocals.toLowerCase()
            const micInputArr = []

            let test = recording.split(' ')
            // if recording is only one word
            if (test.length === 1) {
                micInputArr.push(recording)
                console.log(micInputArr)

                // if recording is more then one word
            } else {

                // sanitize mic inputs
                recording.split('-').join(' ') // remove '-'


                // split words on spaces and push into micInput array
                recording.split(' ').forEach(word => { micInputArr.push(word) })

                // console.log(micInputArr)
            }

            const lastMicInputTime = userInput[userInput.length - 2].time
            const micInputEndTime = userInput[userInput.length - 1].time
            var possibleLyrics = []
            var idxIncrement = 0
            var points = pts

            console.log('mic input time', micInputEndTime)

            // for each line of the track lyrics, 
            track.map((line, idx) => {
                // console.log(ptsIdx)
                // where to start looking for lyrics
                if (idx >= ptsIdx.idx) {

                    // where to stop looking
                    if (line.time + shift < micInputEndTime) {
                        idxIncrement++
                        let words = line.text.toLowerCase().split(' ')
                        words.map(x => { possibleLyrics.push(x) })
                    }
                }
            })

            setPtsIdx({ idx: idxIncrement })
            console.log('possible', possibleLyrics)
            console.log('mic inputs', micInputArr)

            // need to figurer out how to stop the 
            possibleLyrics.map(word => {

                for (let i = 0; i < micInputArr.length; i++) {
                    if (word === micInputArr[i]) {
                        points++
                        console.log(`${word} | ${micInputArr[i]} | ${points}`)
                        return
                    }
                }
            })


            setPts({ pts: points })
        }
    }, [userInput])


    // const handleShiftUp = () => {
    //     setShift(shift + 1)
    // }


    // const handleShiftDown = () => {
    //     setShift(shift - 1)
    // }





    return (
        <div className="center-align">

            <div className="row">
                <div className="divider"></div>
                <h4>{playing && lrcObj1.text ? lrcObj1.text : '-'}</h4>
                <div className="divider"></div>
            </div>

            <div className="row">
                <h6 className="muted">{playing && lrcObj2.text ? lrcObj2.text : 'end'}</h6>
            </div>

            <hr />

            {/* <p>{shift}</p>

            <Button
                onClick={handleShiftDown}
            >sync --
            </Button>

            <Button
                onClick={handleShiftUp}
            >sync ++
            </Button> */}

        </div>
    )
}

export default LyricsContainer;