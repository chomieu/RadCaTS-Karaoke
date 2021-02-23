import React, { useState } from "react"
import lyrics from "../utils/lyrics.json"


export default function LyricsContainer({ timer }) {

    const songLyrics = lyrics

    const [currentLyricTime, setCurrentLyricTime] = useState(0)
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
    const [currentDisplayedLyric, setCurrentDisplayedLyric] = useState(songLyrics)



    return (
        // <p>{currentDisplayedLyric}</p>
        <p>check console log</p>
    )
}