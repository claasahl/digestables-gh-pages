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
}

class Test extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { selectedOption: undefined };
  }

  public render() {
    const names = starwarsNames.all.map(name => ({ label: name, value: name }));
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <Select
        multi={true}
        onChange={this.onChange}
        options={names}
        simpleValue={true}
        value={value}
      />
    );
  }

  private onChange = (selectedOption: IOption) => {
    this.setState({ selectedOption });
  };
}

export default Test;
