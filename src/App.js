import React, { useState } from "react";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import HomeView from "./pages/HomeView.js";
import Table from "./components/table.js"
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    
    <div>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/SignUp" exact>
            <SignUp />
          </Route>
          <Route path="/HomeView" exact>
            <HomeView />
          </Route>
          <Route path="/Table" exact>
            <Table />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
