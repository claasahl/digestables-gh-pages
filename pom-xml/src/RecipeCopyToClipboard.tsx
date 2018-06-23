import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import * as CopyToClipboard from "react-copy-to-clipboard";

interface IProps {
  recipe: string;
}

class RecipeCopyToClipboard extends React.Component<IProps> {
  public render() {
    return (
      <CopyToClipboard text={this.props.recipe}>
        <button className="btn btn-outline-secondary" type="button">
          <FontAwesomeIcon icon="clipboard" />
        </button>
      </CopyToClipboard>
    );
  }
}

export default RecipeCopyToClipboard;
