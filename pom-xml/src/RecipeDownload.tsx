import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

interface IProps {
  recipe: string;
  disabled: boolean;
}

class RecipeDownload extends React.Component<IProps> {
  public render() {
    return (
      <a
        className={
          "btn btn-outline-secondary" + (this.props.disabled ? " disabled" : "")
        }
        tabIndex={this.props.disabled ? -1 : undefined}
        role="button"
        href={this.generateDataURL()}
        download="pom.xml"
      >
        <FontAwesomeIcon icon="cloud-download-alt" />
      </a>
    );
  }

  private generateDataURL(): string {
    return (
      "data:text/plain;charset=utf-8," + encodeURIComponent(this.props.recipe)
    );
  }
}

export default RecipeDownload;
