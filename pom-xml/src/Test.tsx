import * as React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

import * as FileSaver from "file-saver";
import * as JSZip from "jszip";

import matchSorter from "match-sorter";
import * as starwarsNames from "starwars-names";

interface IOption {
  value: string;
  label: string;
}
interface IState {
  selectedOption: IOption | undefined;
  options: IOption[];
}

class Test extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    const names = starwarsNames.all.map(name => ({ label: name, value: name }));
    this.state = { selectedOption: undefined, options: names };
  }

  public render() {
    return (
      <div>
        <Select
          multi={true}
          onChange={this.onChange}
          options={this.state.options}
          value={this.state.selectedOption}
          filterOptions={this.filterOptions}
        />
        <button type="button" className="btn btn-light" onClick={this.onClick}>
          Generate ZIP file
        </button>
      </div>
    );
  }

  private onChange = (selectedOption: IOption) => {
    this.setState({ selectedOption });
  };

  private filterOptions = (
    options: IOption[],
    filter: string,
    currentValues: IOption[]
  ) => {
    const remaingOptions = options.filter(
      option => currentValues.indexOf(option) === -1
    );
    return matchSorter(remaingOptions, filter, { keys: ["label"] });
  };

  private onClick = () => {
    const zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    zip.file("selectedOptions.json", JSON.stringify(this.state.selectedOption));
    zip.generateAsync({ type: "blob" }).then(content => {
      FileSaver.saveAs(content, "example.zip");
    });
  };
}

export default Test;
