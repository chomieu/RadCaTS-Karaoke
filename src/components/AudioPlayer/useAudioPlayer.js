// source: https://codesandbox.io/s/5wwj02qy7k?file=/src/useAudioPlayer.js:0-1246
import { useState, useEffect } from "react";

function useAudioPlayer(isPlaying, setIsPlaying, audio) {
    const [duration, setDuration] = useState();
    const [curTime, setCurTime] = useState();
    const [clickedTime, setClickedTime] = useState();

    useEffect(() => {

        // state setters wrappers
        const setAudioData = () => {
            setDuration(audio.duration);
            setCurTime(audio.currentTime);
        }

        const setAudioTime = () => setCurTime(audio.currentTime);

        // DOM listeners: update React state on DOM events
        audio.addEventListener("loadedmetadata", setAudioData);

        audio.addEventListener("timeupdate", setAudioTime);

        // React state listeners: update DOM on React state changes
        isPlaying ? audio.play() : audio.pause();

        if (clickedTime && clickedTime !== curTime) {
            audio.currentTime = clickedTime;
            setClickedTime(null);
        }

        // effect cleanup
        return () => {
            audio.removeEventListener("loadeddata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
        }
    });

    return {
        curTime,
        duration,
        isPlaying,
        setIsPlaying,
        setClickedTime
    }
}

export default useAudioPlayer;