import React, { useEffect, useState } from "react"
import track from "../utils/lyrics.json"


export default function LyricsContainer({ timer, isActive, setIsActive, userInput }) {

    // track the index location of the current lyrics object
    const [lrcIdx, setLrcIdx] = useState()
    // container for the last lyric object to check for points
    const [lrcObj0, setLrcObj0] = useState()
    // container for the current index lyric object
    const [lrcObj1, setLrcObj1] = useState()
    // container for the next index lyric object 
    const [lrcObj2, setLrcObj2] = useState()

    useEffect(() => {

        // if session is active and timer is 0, start the first set of lyrics
        if (isActive && timer === 0) {
            setLrcObj1(track[lrcIdx.idx])
            setLrcObj2(track[lrcIdx.idx + 1])

            // if session is active & timer matches the time of the next object, access the nested conditional.
        } else if (isActive && timer === lrcObj2.time) {

            // Note: the last set of lyrics are set to null.
            // if there are lyrics, load them.
            if (lrcObj2.lyrics) {

                let x = lrcIdx.idx + 1

                setLrcObj0(track[x - 1])
                setLrcObj1(track[x])
                setLrcObj2(track[x + 1])
                setLrcIdx({ idx: x })

                // if the next lyrics are set to null, toggle to end session throughout page
            } else { setIsActive(false) }
        }

        // if session is not active, load blank data into state for page logic to follow
        if (!isActive) {

            setLrcIdx({ idx: 1 })
            setLrcObj1({ time: 0, lyrics: '' })
            setLrcObj2({ time: 0, lyrics: '' })
        }
    }, [isActive, timer])

    return (
        <div className="center-align">

            <div className="row">
                {isActive ? <h6 className="underline">{track[0].artist} - {track[0].title}</h6> : '-'}
            </div>

            <div className="row">
                <div className="divider"></div>
                <h4>{isActive ? lrcObj1.lyrics : '<select a song>'}</h4>
                <div className="divider"></div>
            </div>

            <div className="row">
                <h6 className="muted">{isActive ? lrcObj2.lyrics : '-'}</h6>
            </div>

            <div className="row">
                <h6 className="userInput">mic transcription</h6>
                <h6 className="userInput">{'<input>'}</h6>
            </div>

        </div>
    )
}