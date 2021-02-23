import React, { useEffect, useState } from "react"
import track from "../utils/lyrics.json"


export default function LyricsContainer({ timer, isActive, setIsActive }) {

    const [lrcIdx, setLrcIdx] = useState()
    const [lrcObj1, setLrcObj1] = useState()
    const [lrcObj2, setLrcObj2] = useState()
    // const [] = useState()

    useEffect(() => {

        // if session is active and timer is 0
        if (isActive && timer === 0) {
            setLrcObj1(track[lrcIdx.idx])
            setLrcObj2(track[lrcIdx.idx + 1])


        } else if (isActive && timer === lrcObj2.time) {
            if (lrcObj2.lyrics) {

                let x = lrcIdx.idx + 1

                setLrcObj1(track[x])
                setLrcObj2(track[x + 1])
                setLrcIdx({ idx: x })

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
                {isActive ? <h6>{track[0].artist} - {track[0].title}</h6> : ''}
            </div>
            <div className="row">
                <h4>{isActive ? lrcObj1.lyrics : '<select a song>'}</h4>
                <div className="divider"></div>
                {/* <h6>Active</h6> */}
            </div>
            <div className="row">
                <h6 className="mute">{isActive ? lrcObj2.lyrics : '<>'}</h6>
                <div className="divider"></div>
                {/* <h6 className="mute">Next</h6> */}
            </div>
        </div>
    )
}