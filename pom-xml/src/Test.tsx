import * as React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

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
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <Select
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={[
          { value: "one", label: "One" },
          { value: "two", label: "Two" }
        ]}
      />
    );
  }

  private handleChange = (selectedOption: IOption) => {
    this.setState({ selectedOption });
  };
}

export default Test;
