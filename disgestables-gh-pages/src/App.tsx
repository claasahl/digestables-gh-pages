import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import { options } from "./data";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Select
          isMulti={true}
          closeMenuOnSelect={false}
          options={options}
          components={makeAnimated<string>()}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
        />
      </div>
    );
  }

  private getOptionLabel(option: string): string {
    return option;
  }
  private getOptionValue(option: string): string {
    return option;
  }
}

export default App;
