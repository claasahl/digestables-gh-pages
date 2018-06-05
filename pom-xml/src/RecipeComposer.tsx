import { Map } from "immutable";
import * as React from "react";
import "./RecipeComposer.css";

import Ingredient from "./Ingredient";

interface IIngredient {
  name: string;
  xml: string;
}

interface IRecipeComposerState {
  ingredients: Map<string, IIngredient>;
}

class RecipeComposer extends React.Component<any, IRecipeComposerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ingredients: Map<string, IIngredient>()
    };
    this.handleSampleAdd = this.handleSampleAdd.bind(this);
    this.handleSampleRemove = this.handleSampleRemove.bind(this);
    this.remove = this.remove.bind(this);
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
          return (
            <div key={ingredient.name}>
              <Ingredient name={ingredient.name} onRemove={this.remove} />
            </div>
          );
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
    this.remove("test");
  }

  private add(ingredient: IIngredient): void {
    this.setState(state => ({
      ingredients: Map<string, IIngredient>(state.ingredients).set(
        ingredient.name,
        ingredient
      )
    }));
  }

  private remove(name: string): void {
    this.setState(state => ({
      ingredients: Map<string, IIngredient>(state.ingredients).delete(name)
    }));
  }
}

export default RecipeComposer;
