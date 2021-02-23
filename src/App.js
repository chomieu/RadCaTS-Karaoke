import React, { useEffect, useState, useRef } from 'react';
import Loading from "./components/Loading"
import Timer from "./components/Timer"
import SpeechContainer from "./components/SpeechContainer"



function App() {
  return (
    <div className=" container center-align">
      <Loading />
      <div className="divider"></div>
      <SpeechContainer
      />
    </div>
  )
}

export default App;
