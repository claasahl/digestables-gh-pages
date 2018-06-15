import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Ingredient.css";

interface IngredientProps {
  name: string;
  onRemove: (name: string) => void;
}

export class Ingredient extends React.Component<IngredientProps> {
  public render() {
    const onRemove = () => this.props.onRemove(this.props.name);
    return (
      <span className="badge badge-light">
        ${this.props.name}
        <div onClick={onRemove}>
          <FontAwesomeIcon icon="window-close" transform="shrink-5" />
        </div>
      </span>
    );
  }
}
export default Ingredient;
