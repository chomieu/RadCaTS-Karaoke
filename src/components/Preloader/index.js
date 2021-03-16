import React from "react";
import { Row, Col, ProgressBar, Preloader } from 'react-materialize';
import "./style.css";



function preloader() {
    return (
        <Row >
            <br />
            {/* <Col s={6} className="offset-s3">
                <ProgressBar />
            </Col> */}

            <Col s={4} className="offset-s4" >
                <Preloader
                    active
                    color="blue"
                    flashing
                    size="big"
                />
            </Col>
        </Row >
    )
}

export default preloader;