import * as React from "react";
import "./Ingredient.css";

interface IngrediantProps {
  name: string;
  xmlContent: string;
  onRemove: (name: string) => void;
}

class Ingrediant extends React.Component<IngrediantProps> {
  public render() {
    return "I am an Ingrediant";
  }
}
export default Ingrediant;
