import React from 'react'
import { Row, Col } from 'react-materialize';
import "./style.css"


export default function ScoreRow({ data }) {
    return (
        <Row className="score-row">
            <Col s={10} className="left-align">
                <p>{data.artist} - {data.name}</p>
            </Col>
            <Col s={2} className="right-align">
                <p>{data.score}</p>
            </Col>
        </Row>
    )
}
