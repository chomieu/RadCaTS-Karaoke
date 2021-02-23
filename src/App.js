import React from "react";
import Loading from "./components/Loading";
import TestModal from "./components/TestModal";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Modal, Button } from 'react-materialize';

function App() {
  return <div className="App center-align">
    <Loading />
    <TestModal />
  </div>;
}

export default App;
