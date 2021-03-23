// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import Play from "./Play";
import { Row, Col, Button } from "react-materialize";
import Pause from "./Pause";

function AudioBottom({ pts, isPlaying, setIsPlaying, handleFinish, handlePlay, handlePlaySound, start, setStart, hidePlayBtn, sessionData }) {

    const handleStart = () => {
        setStart(true);
    }

    return (
        <>
            <Row className="player bottom">
                <Col s={4} className="points__container">
                    <h1 className="points">{pts.pts}</h1>
                    <div className="divider"></div>
                    <h3 className="points__label">score</h3>
                </Col>

                <Col s={4}>
                    {!sessionData.isActive

                        ? <Button className="ready_button btn_purple" style={start ? { backgroundColor: "red" } : null} onClick={handleStart}>Ready</Button>
                        : <Button className="finish_button btn_blue" onClick={handleFinish}>Finish</Button>

                    }
                </Col>

                <Col s={4}>
                    {/* <span className="bar__time">{formatDuration(curTime)} / {formatDuration(duration)}</span> */}

                    {!sessionData.isActive
                        ? <Play
                            handleClick={handlePlay}
                            handlePlaySound={handlePlaySound}
                            setStart={setStart}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            hidePlayBtn={hidePlayBtn}
                        />
                        : null
                    }
                </Col>
            </Row>
        </>



    );
}

export default AudioBottom;