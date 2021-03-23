import React from 'react'
import { Container, Row, Col } from 'react-materialize';
import ScoreRow from "./ScoreRow.js"
import "./style.css"


export default function UserHighScores({ userData, highScores }) {
    highScores.scores = highScores.scores.sort((a, b) => (a.score < b.score) ? 1 : -1) // Chomie U leaderboard sorting code
    return (
        <Container>
            <h5>{userData.username}'s High Scores!</h5>
            <Row className="highscores-container">
                {highScores.scores.map((data, idx) => { return <ScoreRow key={idx} data={data} /> })}
            </Row>
        </Container>
    )
}
