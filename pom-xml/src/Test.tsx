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
  selectedOptions: IOption | undefined;
  options: IOption[];
}

class Test extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    const names = starwarsNames.all.map(name => ({ label: name, value: name }));
    this.state = { selectedOptions: undefined, options: names };
  }

  public render() {
    return (
      <div>
        <Select
          multi={true}
          onChange={this.onChange}
          options={this.state.options}
          value={this.state.selectedOptions}
          filterOptions={this.filterOptions}
        />
        <button type="button" className="btn btn-light" onClick={this.onClick}>
          Generate ZIP file
        </button>
      </div>
    );
  }

  private onChange = (selectedOptions: IOption) => {
    this.setState({ selectedOptions });
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
    zip.file(
      "selectionOption.json",
      JSON.stringify(this.state.selectedOptions)
    );
    // for(const selectedOption of this.state.selectedOption) {
    //   zip.file(selectedOption.label + ".json", JSON.stringify(selectedOption));
    // }
    zip.generateAsync({ type: "blob" }).then(content => {
      FileSaver.saveAs(content, "example.zip");
    });
  };
}

export default Test;
