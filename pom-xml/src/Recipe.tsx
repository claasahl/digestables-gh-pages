import { Map } from "immutable";
import * as React from "react";
import "./Recipe.css";

interface IIngredient {
  name: string;
  xml: string;
}

interface IRecipeState {
  ingredients: Map<string, IIngredient>;
}

class Recipe extends React.Component<any, IRecipeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ingredients: Map<string, IIngredient>()
    };
    this.handleSampleAdd = this.handleSampleAdd.bind(this);
    this.handleSampleRemove = this.handleSampleRemove.bind(this);
  }
  public render() {
    return (
      <div>
        <button onClick={this.handleSampleAdd}>add</button>
        <button onClick={this.handleSampleRemove}>remove</button>
        {this.state.ingredients.valueSeq().map(ingredient => {
          // FIXME: why???? mapper: (value?: IIngredient | undefined ....
          if (ingredient === undefined) {
            return "";
          }
          return <div key={ingredient.name}>{ingredient.name}</div>;
        })}
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
      ingredients: Map<string, IIngredient>(state.ingredients).set(
        ingredient.name,
        ingredient
      )
    }));
  }

  private remove(ingredient: IIngredient): void {
    this.setState(state => ({
      ingredients: Map<string, IIngredient>(state.ingredients).delete(
        ingredient.name
      )
    }));
  }
}

export default Recipe;
