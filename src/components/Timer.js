import React, { useState, useEffect, useRef } from 'react';

// example used from https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b
export default function Timer({ startTimer }) {

    const [timer, setTimer] = useState(0)
    const increment = useRef(null)

    useEffect(() => {
        if (startTimer) {
            handleStart()
        } else {
            handleReset()
        }
    }, [startTimer])

    const handleStart = () => {
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleReset = () => {
        clearInterval(increment.current)
        setTimer(0)
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        return `${getMinutes} : ${getSeconds}`
    }

    return (
        formatTime()
    );
}