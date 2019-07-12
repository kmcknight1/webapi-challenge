import React from "react";
import { Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="App">
      <Route
        path="/"
        render={props => {
          return <Home {...props} />;
        }}
      />
      <Route
        path="/projects"
        render={props => {
          return <Projects {...props} />;
        }}
      />
    </div>
  );
}

export default App;
