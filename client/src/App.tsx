import React, { useEffect, useState } from "react";
import "./styles/App.css";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-container">
          <Switch>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;