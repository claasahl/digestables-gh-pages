import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import { options } from "./data";
import { IDigestable } from "./Digestable";

import { saveAs } from "file-saver";
import * as JSZip from "jszip";

interface IState {
  selectedOptions: IDigestable[];
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedOptions: []
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const { selectedOptions } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          You have {selectedOptions.length}{" "}
          {selectedOptions.length > 1 || selectedOptions.length === 0
            ? "options"
            : "option"}{" "}
          selected.
        </p>
        {selectedOptions.map(selectedOption => (
          <p key={selectedOption.name}>{JSON.stringify(selectedOption)}</p>
        ))}
        <button onClick={this.save} disabled={selectedOptions.length === 0}>
          save
        </button>
        <div className="container">
          <Select<IDigestable>
            isMulti={true}
            closeMenuOnSelect={false}
            options={options}
            components={makeAnimated()}
            onChange={this.onChange}
            getOptionLabel={this.getOptionLabel}
            getOptionValue={this.getOptionValue}
          />
        </div>
      </div>
    );
  }

  private async save() {
    const { selectedOptions } = this.state;
    const zip = new JSZip();
    zip.file("Hello.txt", "Hello world\n");
    for (const option of selectedOptions) {
      zip.file(`${option.name}/digestable.json`, JSON.stringify(option));
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "hello.zip");
  }

  private onChange(selectedOptions: IDigestable[]) {
    this.setState(() => ({
      selectedOptions
    }));
  }
  private getOptionLabel(option: IDigestable): string {
    return option.name;
  }
  private getOptionValue(option: IDigestable): string {
    return option.name;
  }
}

export default App;
