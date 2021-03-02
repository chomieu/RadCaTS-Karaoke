import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Page from "./pages/Page";


function App() {

  return (

    <div className="App center-align">
      <Router>
        <Switch>
          <Route path={"/api/session/:id"}>
            <Page />
          </Route>
          <Route path={"/"}>
            <Page />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;