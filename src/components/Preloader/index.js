import React from "react"
import { Row, Col, ProgressBar } from 'react-materialize'
import "./style.css"



function preloader() {
    return (
        <Row >
            <br />
            <Col s={6} className="offset-s3">
                <ProgressBar />
            </Col>
        </Row>
    )
}

export default preloader;