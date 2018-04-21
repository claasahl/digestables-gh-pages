import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

import sampleXml from "./recipes/sample-recipe.xml";

class App extends React.Component {
  public render() {
    const sample = JSON.stringify({ test: "testttt" });
    const sample2 = JSON.stringify(sampleXml);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>{sample2}</code> and save to reload.
        </p>
        <a
          href={"data:text/plain;charset=utf-8," + encodeURIComponent(sample)}
          download="pom.xml"
        >
          recipe
        </a>
      </div>
    );
  }
}

export default App;
