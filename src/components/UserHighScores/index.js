import React from 'react'
import { Container, Row, Col } from 'react-materialize';
import ScoreRow from "./ScoreRow.js"
import "./style.css"


export default function UserHighScores({ userData, highScores }) {
    highScores.scores = highScores.scores.sort((a, b) => (a.score < b.score) ? 1 : -1) // Chomie U leaderboard sorting code
    return (
        <Container>
            <p className="right-align">{userData.username}'s High Scores!</p>
            <Row className="highscores-container">
                {highScores.scores.map((data, idx) => { return <ScoreRow key={idx} data={data} /> })}
            </Row>
        </Container>
    )
}
