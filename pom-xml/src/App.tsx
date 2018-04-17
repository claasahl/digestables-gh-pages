import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    const sample = JSON.stringify({ test: "testttt"});
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={this.handleClick}>click me</button>
        <a href={'data:text/plain;charset=utf-8,' + encodeURIComponent(sample)} download="pom.xml">recipe</a>

      </div>
    );
  }

  private handleClick() {
    console.log("clicked");

  }
}

export default App;
