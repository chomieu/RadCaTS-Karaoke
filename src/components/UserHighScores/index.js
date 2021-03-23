import React from 'react'
import ScoreRow from "./ScoreRow.js"


export default function UserHighScores({ highScores }) {

    highScores.scores = highScores.scores.sort((a, b) => (a.score < b.score) ? 1 : -1) // Chomie U leaderboard sorting code
    return (
        <>
            <p>High Scores</p>

            {highScores.scores.map((data, idx) => { return <ScoreRow key={idx} data={data} /> })}
        </>
    )
}
