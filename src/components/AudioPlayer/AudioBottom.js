// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import Play from "./Play";
import { Row, Col, Button } from "react-materialize";
import Pause from "./Pause";

function AudioBottom({ pts, isPlaying, setIsPlaying, handlePause, handlePlay, handlePlaySound, start, setStart, hidePlayBtn }) {

    const handleFinish = () => {
        setIsPlaying(false);
        console.log('finish') // send PUT request to /api/session/:id
    }

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
                        <Button className="finish_button" onClick={handleFinish}>Finish</Button>
                        : <Button className="ready_button btn_purple" style={start ? { backgroundColor: "red" } : null} onClick={handleStart}>Ready</Button>
                    }
                </Col>

                <div className="col s8 m9 l10 right-align">

                    <div className="right-align">
                        <Play
                            handleClick={handlePlay}
                            handlePlaySound={handlePlaySound}
                            setStart={setStart}
                            hidePlayBtn={hidePlayBtn}
                        />
                    </div>
                </div>
            </Row>
        </>



    );
}

export default AudioBottom;