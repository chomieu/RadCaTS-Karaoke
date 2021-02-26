import React, { useEffect, useState } from "react"
import track from "../../utils/lyrics.json"
import "./style.css"



function LyricsContainer({ curTime, playing, userInput, pts, setPts }) {

    // track the index location of the current lyrics object
    const [lrcIdx, setLrcIdx] = useState()
    // // container for the previous lyric object to check for pts
    const [lrcObj0, setLrcObj0] = useState()
    // container for the current index lyric object
    const [lrcObj1, setLrcObj1] = useState()
    // container for the next index lyric object 
    const [lrcObj2, setLrcObj2] = useState()



    const resetLyrics = () => {
        setLrcIdx({ idx: 1 })
        setLrcObj0({ time: 0, lyrics: '' })
        setLrcObj1({ time: 0, lyrics: '' })
        setLrcObj2({ time: 0, lyrics: '' })
    }


    useEffect(() => {
        resetLyrics()
    }, [])


    useEffect(() => {
        // if session is active and curTime is 0, start the first set of lyrics
        if (playing && Math.floor(curTime) === 0) {
            setLrcObj1(track[lrcIdx.idx])
            setLrcObj2(track[lrcIdx.idx + 1])
            // if session is active & curTime matches the time of the next object, access the nested conditional.
        } else if (playing && Math.floor(curTime) === lrcObj2.time) {
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
    }, [playing, curTime])


    // update points based on new user input
    // make sure there are entries from user to avoid errors
    // create array of words from user input
    // concatinate the current lyrics with the last lyrics, check if any user input matches any words
    useEffect(() => {
        if (userInput.length > 1) {
            var mic = userInput[userInput.length - 2].vocals.split(' ')
            var lrc0 = lrcObj0.lyrics

            if (lrcObj1.lyrics) { lrc0 = `${lrcObj0.lyrics} ${lrcObj1.lyrics}` }

            lrc0 = lrc0.split(' ')
            console.log(lrc0)
            mic.map(x => {
                for (let i = 0; i < lrc0.length; i++) {
                    if (x === lrc0[i]) {
                        console.log(`${x} || ${lrc0[i]}`)
                        setPts({ pts: pts++ })
                    }
                }
            })
        }
    }, [userInput])





    return (
        <div className="center-align">

            <div className="row muted">
                {playing ? <h6 className="underline">{track[0].artist} - {track[0].title}</h6> : '-'}
            </div>

            <div className="row">
                <div className="divider"></div>
                <h4>{playing ? lrcObj1.lyrics : '-'}</h4>
                <div className="divider"></div>
            </div>

            <div className="row">
                <h6 className="muted">{playing ? lrcObj2.lyrics : '-'}</h6>
            </div>

        </div>
    )
}

export default LyricsContainer;