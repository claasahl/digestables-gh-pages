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
        <p>
          You have {selectedOptions.length}{" "}
          {selectedOptions.length > 1 || selectedOptions.length === 0
            ? "options"
            : "option"}{" "}
          selected.
        </p>
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

  private async fetch(option: IDigestable, file: string): Promise<string> {
    const url = new URL("./" + file, option.baseURL);
    const response = await fetch(url.toString());
    return response.text();
  }

  private async save() {
    const { selectedOptions } = this.state;
    const zip = new JSZip();
    for (const option of selectedOptions) {
      zip.file(`${option.name}/option.json`, JSON.stringify(option));
      for (const file of option.files) {
        const content = await this.fetch(option, file);
        zip.file(`${option.name}/${file}`, content, { binary: true });
      }
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
