// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import Play from "./Play";
import { Row, Col, Button } from "react-materialize";

function AudioBottom({ pts, isPlaying, setIsPlaying, handleFinish, handlePlay, handlePlaySound, start, setStart, hidePlayBtn }) {

    const handleStart = () => {
        setStart(true);
    }

    return (
        <>
            <Row className="player bottom">
                <Col className="s4 points__container">
                    <h1 className="points">{pts.pts}</h1>
                    <div className="divider"></div>
                    <h3 className="points__label">score</h3>
                </Col>

                <Col className="s4" >
                    {isPlaying ?
                        <Button className="finish_button btn_blue" onClick={handleFinish}>Finish</Button>
                        : <Button className="ready_button btn_purple" style={start ? { backgroundColor: "red" } : null} onClick={handleStart}>Ready</Button>
                    }
                </Col>

                <Col className="s4">
                    <Play
                        handleClick={handlePlay}
                        handlePlaySound={handlePlaySound}
                        hidePlayBtn={hidePlayBtn}
                    />
                </Col>
            </Row>
        </>
    );
}

export default AudioBottom;