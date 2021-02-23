import React from "react";
import './App.css';
import Header from "./components/Header";
import FileDrop from "./components/FileDrop";
import Loading from "./components/Loading";
import TestModal from "./components/TestModal";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Modal, Button } from 'react-materialize';

function App() {
  return <div className="App center-align">
    <Header/>
    <Loading />
    <TestModal />
    <SignIn/>
    <SignUp/>
    <FileDrop/>
  </div>;
}

export default App;
