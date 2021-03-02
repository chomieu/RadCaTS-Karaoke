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
    id: "",
    token: "",
    username: "",
    isLoggedIn: false,
    profilePicture: ""
  })

  return (
    <Router>
      <Switch>
        <Route path={"/"}>
          <Landing userData={ userData } setUserData={ setUserData } />
        </Route>
        <Route path={"/api/session/:id"}>
          <Session userData={ userData } setUserData={ setUserData } />
        </Route>
        <Route path={"/search"}>
          <SearchPage userData={ userData } setUserData={ setUserData } />
        </Route>
      </Switch>
    </Router>
  );
}


export default App;