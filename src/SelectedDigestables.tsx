import * as React from "react";
import { IDigestable } from "./Digestable";

interface IProps {
  selected: IDigestable[];
}
class SelectedDigestables extends React.Component<IProps> {
  public render() {
    const { selected } = this.props;
    return (
      <p>
        You have {selected.length}{" "}
        {selected.length > 1 || selected.length === 0 ? "options" : "option"}{" "}
        selected.
      </p>
    );
  }
}

export default SelectedDigestables;
