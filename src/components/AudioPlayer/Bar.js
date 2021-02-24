// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

export default function Bar({ duration, curTime, onTimeUpdate }) {

    // const barProgressColor = "rgb(232, 211, 162)"
    const barProgressColor = "rgb(145, 123, 76)"

    const curPercentage = (curTime / duration) * 100;

    function calcClickedTime(e) {
        const clickPositionInPage = e.pageX;
        const bar = document.querySelector(".bar__progress");
        const barStart = bar.getBoundingClientRect().left + window.scrollX;
        const barWidth = bar.offsetWidth;
        const clickPositionInBar = clickPositionInPage - barStart;
        const timePerPixel = duration / barWidth;
        return timePerPixel * clickPositionInBar;
    }

    function handleTimeDrag(e) {
        onTimeUpdate(calcClickedTime(e));

        const updateTimeOnMove = eMove => {
            onTimeUpdate(calcClickedTime(eMove));
        };

        document.addEventListener("mousemove", updateTimeOnMove);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", updateTimeOnMove);
        });
    }

    return (
        <div className="row bar">

            <div
                className="bar__progress"
                style={{ background: `linear-gradient(to right, ${barProgressColor} ${curPercentage}%, rgba(255, 255, 255, 0) 0)` }}
                onMouseDown={e => handleTimeDrag(e)}
            >
                <span
                    className="bar__progress__knob"
                    style={{ left: `${curPercentage - 1}%` }}
                />
            </div>

        </div>
    );
}