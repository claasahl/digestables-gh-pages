import * as React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

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
      <Select
        multi={true}
        onChange={this.onChange}
        options={this.state.options}
        simpleValue={true}
        value={this.state.selectedOption}
      />
    );
  }

  private onChange = (selectedOption: IOption) => {
    this.setState({ selectedOption });
  };
}

export default Test;
