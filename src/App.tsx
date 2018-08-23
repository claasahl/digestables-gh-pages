import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

import makeAnimated from "react-select/lib/animated";
import Select from "react-select/lib/Async";
import { createFilter, Option } from "react-select/lib/filters";
import { options as data } from "./data";
import { IDigestable } from "./Digestable";
import SelectedDigestables from "./SelectedDigestables";

import { saveAs } from "file-saver";
import * as JSZip from "jszip";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCookie,
  faCookieBite,
  faFileArchive
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeControl } from "./CustomControl";
import CustomIndicatorSeparator from "./CustomIndicatorSeparator";

library.add(faCookie, faCookieBite, faFileArchive);

interface IState {
  selectedOptions: IDigestable[];
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedOptions: []
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  public render() {
    const { selectedOptions } = this.state;
    const CustomControl = makeControl({
      isDisabled: this.isDisabled,
      onMouseDown: this.onMouseDown,
      onTouchEnd: this.onTouchEnd
    });
    return (
      <div className="App">
        <header className="App-header">
          <FontAwesomeIcon className="App-logo" size="5x" icon="cookie-bite" />
          <h1 className="App-title">Combine Digestable Examples</h1>
        </header>
        <div className="App-content container">
          <SelectedDigestables selected={selectedOptions} />
          <Select<Option>
            isClearable={true}
            isMulti={true}
            defaultOptions={this.options(data)}
            components={makeAnimated({
              Control: CustomControl,
              IndicatorSeparator: CustomIndicatorSeparator
            })}
            onChange={this.onChange}
            loadOptions={this.loadOptions}
          />
        </div>
      </div>
    );
  }

  private onMouseDown(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.save();
  }

  private onTouchEnd(event: React.TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.save();
  }

  private isDisabled(): boolean {
    return this.state.selectedOptions.length === 0;
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

  private options(digestables: IDigestable[]): Option[] {
    return digestables.map(option => ({
      data: option,
      label: option.name,
      value: option.name
    }));
  }

  // https://raw.githubusercontent.com/claasahl/digestables-gh-pages/master/public/digestables/simple/.digestable.json
  private async loadOptions(inputValue: string): Promise<Option[]> {
    const digestables: IDigestable[] = [...data];
    try {
      const url = new URL(inputValue);
      const response = await fetch(inputValue);
      const digestable = await response.json();
      digestable.baseURL = url;
      if (this.still(digestable)) {
        return Promise.resolve(this.options([digestable]));
      }
    } catch (error) {
      // ignore
    }
    const filter = createFilter();
    const filteredDigestables = this.options(digestables).filter(option =>
      filter(option, inputValue)
    );
    return Promise.resolve(filteredDigestables);
  }

  private still(digestable: IDigestable): boolean {
    return digestable && Array.isArray(digestable.files);
  }
}

export default App;
