import React, { useEffect, useState, useRef } from 'react';
import Loading from "./components/Loading/"
import "./App.css"
import SpeechContainer from "./components/SpeechContainer/"



function App() {

  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const increment = useRef(null)


  useEffect(() => {
    if (isActive) {
      handleStart()
    } else {
      handleReset()
    }
  }, [isActive])

  const handleStart = () => {
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(increment.current)
    setTimer(0)
  }


  return (
    <div className=" container center-align">
      <Loading />
      <br />
      <SpeechContainer
        timer={timer}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </div>
  )
}

export default App;
