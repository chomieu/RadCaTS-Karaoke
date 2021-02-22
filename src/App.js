import React, { useEffect, useState } from 'react';
import Loading from "./components/Loading"
import TestModal from "./components/TestModal"
import SpeechContainer from "./components/SpeechContainer"



function App() {
  const [timer, setTimer] = useState(0)

  const handleStartTimer = () => {
    console.log('start timer')
  }

  return (
    <div className=" container center-align">
      <Loading />
      <div className="divider"></div>
      <SpeechContainer
        handleStartTimer={handleStartTimer}
      />
    </div>
  )
}

export default App;
