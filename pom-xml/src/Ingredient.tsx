import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Ingredient.css";

interface IngredientProps {
  name: string;
  xmlContent: string;
  onRemove: (name: string) => void;
}

class Ingredient extends React.Component<IngredientProps> {
  public render() {
    return (
      <span className="badge badge-light">
        ${this.props.name}
        <FontAwesomeIcon icon="window-close" transform="shrink-5" />
      </span>
    );
  }
}
export default Ingredient;
