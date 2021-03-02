import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import API from "./utils/API";
import Header from "./components/Header";
import Session from "./pages/Session";
import SearchPage from "./pages/SearchPage";
import Landing from "./pages/Landing";


function App() {

  const [userData, setUserData] = useState({
    profilePicture: "",
    isLoggedIn: false,
    username: "",
    token: "",
    id: ""
  })

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
        <Route exact path="/api/session/:id">
          <Session userData={userData} setUserData={setUserData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;