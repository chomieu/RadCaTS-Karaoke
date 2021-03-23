import React from 'react'
import ScoreRow from "./ScoreRow.js"


export default function UserHighScores({ userData }) {
    console.log(userData)
    return (
        <>
            <p>High Scores</p>

            {userData.highScores.map((data, idx) => { return <ScoreRow key={idx} data={data} /> })}
        </>
    )
}
