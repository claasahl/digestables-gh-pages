import * as React from "react";
import { IDigestable } from "./Digestable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  selected: IDigestable[];
}
class SelectedDigestables extends React.Component<IProps> {
  public render() {
    const { selected } = this.props;
    if (selected.length === 0) {
      return null;
    }
    return (
      <p>
        You have{" "}
        {selected.map(() => (
          <FontAwesomeIcon icon="cookie" />
        ))}{" "}
        selected.
      </p>
    );
  }
}

export default SelectedDigestables;
