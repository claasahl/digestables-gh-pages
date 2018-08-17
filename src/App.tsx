import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

import makeAnimated from "react-select/lib/animated";
import Select from "react-select/lib/Creatable";
import { Option } from "react-select/lib/filters";
import { options as data } from "./data";
import { IDigestable } from "./Digestable";

import { saveAs } from "file-saver";
import * as JSZip from "jszip";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCookie, faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectedDigestables from "./SelectedDigestables";

library.add(faCookie, faCookieBite);

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
    const options = data.map(option => ({
      data: option,
      label: option.name,
      value: option.name
    }));
    return (
      <div className="App">
        <header className="App-header">
          <FontAwesomeIcon className="App-logo" size="5x" icon="cookie-bite" />
          <h1 className="App-title">Combine Digestable Examples</h1>
        </header>
        <SelectedDigestables selected={selectedOptions} />
        <div className="container">
          <Select<Option>
            isClearable={true}
            isMulti={true}
            options={options}
            components={makeAnimated()}
            onChange={this.onChange}
            isValidNewOption={this.isValidNewOption}
            getNewOptionData={this.getNewOptionData}
          />
          <button
            type="button"
            className="btn btn-outline-danger btn-lg"
            onClick={this.save}
            disabled={selectedOptions.length === 0}
          >
            Save
          </button>
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

  private onChange(selectedOptions: Option[]) {
    this.setState(() => ({
      selectedOptions: selectedOptions.map(option => option.data)
    }));
  }

  private isValidNewOption(inputValue: string): boolean {
    // tslint:disable:no-console
    try {
      // https://raw.githubusercontent.com/claasahl/digestables-gh-pages/master/public/digestables/simple/.digestable.json
      console.log(inputValue);
      const url = new URL(inputValue);
      console.log(url);
      console.log(url.pathname.endsWith("/.digestable.json"));
      return url.pathname.endsWith("/.digestable.json");
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private getNewOptionData(inputValue: string): Option {
    return {
      data: {
        baseURL: new URL("file://./example-no-1/"),
        files: [],
        name: inputValue
      },
      label: inputValue,
      value: inputValue
    };
  }
}

export default App;
