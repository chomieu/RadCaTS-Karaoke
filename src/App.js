import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import EditLyrics from "./pages/EditLyrics"
import Session from "./pages/Session";
import Landing from "./pages/Landing";
import LiveSession from "./pages/LiveSession"
import './App.css';


function App() {

  const [userData, setUserData] = useState({ isLoggedIn: false })
  const [sessionData, setSessionData] = useState([])


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <Header userData={userData} setUserData={setUserData} /> */}
          <Landing userData={userData} setUserData={setUserData} />
        </Route>
        <Route exact path="/search">
          {/* <Header userData={userData} setUserData={setUserData} /> */}
          <SearchPage userData={userData} setUserData={setUserData} />
        </Route>
        <Route exact path="/lyrics/:id">
          <EditLyrics userData={userData} setUserData={setUserData} sessionData={sessionData} setSessionData={setSessionData} />
        </Route>
        <Route exact path="/api/session/:id">
          <Session userData={userData} setUserData={setUserData} sessionData={sessionData} setSessionData={setSessionData} />
        </Route>
        <Route exact path="/liveSession">
          <LiveSession />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;