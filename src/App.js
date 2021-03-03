import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KittyHeader from "./components/KittyHeader";
import SearchPage from "./pages/SearchPage";
import EditLyrics from "./pages/EditLyrics"
import Session from "./pages/Session";
import Landing from "./pages/Landing";
import './App.css';


function App() {

  const [userData, setUserData] = useState({ isLoggedIn: false })
  const [sessionData, setSessionData] = useState([])


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            <KittyHeader />
            <Landing userData={userData} setUserData={setUserData} />
          </div>
          {/* <Header userData={userData} setUserData={setUserData} /> */}
        </Route>
        <Route exact path="/search">
          {/* <Header userData={userData} setUserData={setUserData} /> */}
          <KittyHeader />
          <SearchPage userData={userData} setUserData={setUserData} />
        </Route>
        <Route exact path="/lyrics/:id">
          <KittyHeader />
          <EditLyrics userData={userData} setUserData={setUserData} sessionData={sessionData} setSessionData={setSessionData} />
        </Route>
        <Route exact path="/api/session/:id">
          <KittyHeader />
          <Session userData={userData} setUserData={setUserData} sessionData={sessionData} setSessionData={setSessionData} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;