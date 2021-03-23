import React from 'react'
import { Container, Row, Col } from 'react-materialize';


export default function ScoreRow({ data }) {
    // labels are not being loaded yet
    return (
        <Container>
            <Row className="userHighScores">
                <Col s={10} className="left-align">
                    <p>{data.label}</p>
                </Col>
                <Col s={2} className="right-align">
                    <p>{data.score}</p>
                </Col>
            </Row>
        </Container>
    )
}
