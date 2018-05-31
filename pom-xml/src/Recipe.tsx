import * as React from "react";
import "./Recipe.css";

interface IIngredient {
  name: string;
  xml: string;
}

interface IRecipeState {
  ingredients: IIngredient[];
}

class Recipe extends React.Component<any, IRecipeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ingredients: []
    };
    this.handleSampleAdd = this.handleSampleAdd.bind(this);
    this.handleSampleRemove = this.handleSampleRemove.bind(this);
  }
  public render() {
    return (
      <div>
        <button onClick={this.handleSampleAdd}>add</button>
        <button onClick={this.handleSampleRemove}>remove</button>
        {this.state.ingredients.map(({ name }) => <div key={name}>{name}</div>)}
      </div>
    );
  }

  private handleSampleAdd(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    this.add({ name: "test", xml: "<data></data>" });
  }

  private handleSampleRemove(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    this.remove({ name: "test", xml: "<data></data>" });
  }

  private add(ingredient: IIngredient): void {
    this.setState(state => ({
      ingredients: [...state.ingredients, ingredient]
    }));
  }

  private remove(ingredient: IIngredient): void {
    this.setState(state => {
      const ingredients = [...state.ingredients];
      const index = ingredients.findIndex(value => value === ingredient);
      return {
        ingredients: index >= 0 ? ingredients.splice(index, 1) : ingredients
      };
    });
  }
}

export default Recipe;
