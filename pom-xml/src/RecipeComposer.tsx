import { Map } from "immutable";
import * as React from "react";
import "./RecipeComposer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecipeCopyToClipboard from "./RecipeCopyToClipboard";
import RecipeDownload from "./RecipeDownload";

import Select from "react-select";
import { Ingredient, ingredients } from "./ingredients/Ingredients";
import { mergeAsync } from "./ingredients/IngredientsMerger";

interface IOption {
  value: Ingredient;
  label: string;
}

interface IRecipeComposerState {
  ingredients: Map<string, Ingredient>;
  options: IOption[];
  recipe: string;
  selectedOption: IOption | undefined;
  updateRecipe: boolean;
}

class RecipeComposer extends React.Component<any, IRecipeComposerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ingredients: Map<string, Ingredient>(),
      options: ingredients.map(ingrdient => ({
        label: ingrdient.name,
        value: ingrdient
      })),
      recipe: "",
      selectedOption: undefined,
      updateRecipe: false
    };
    this.handleSampleAdd = this.handleSampleAdd.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  public componentDidUpdate() {
    if (this.state.updateRecipe) {
      this.fetchRecipe();
    }
  }

  public render() {
    const disabled =
      this.state.updateRecipe || this.state.ingredients.isEmpty();
    return (
      <div>
        <div id="recipe-composer">
          <div className="input-group">
            <Select
              multi={true}
              onChange={this.onChange}
              options={this.state.options}
              simpleValue={true}
              value={this.state.selectedOption}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                onClick={this.handleSampleAdd}
                type="button"
              >
                <FontAwesomeIcon icon="plus-square" />
              </button>
            </div>
            <div className="input-group-append">
              <RecipeDownload recipe={this.state.recipe} disabled={disabled} />
            </div>
            <div className="input-group-append">
              <RecipeCopyToClipboard
                recipe={this.state.recipe}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onChange = (selectedOption: IOption) => {
    this.setState({ selectedOption });
  };

  private fetchRecipe() {
    const selectedIngredients = this.state.ingredients.toArray();
    mergeAsync(selectedIngredients).then(content => {
      if (this.state.recipe === content) {
        this.setState(state => ({
          ...state,
          updateRecipe: false
        }));
      } else {
        this.setState(state => ({
          ...state,
          recipe: content,
          updateRecipe: false
        }));
      }
    });
  }

  private handleSampleAdd(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    this.add({ ...ingredients[0], name: "test" });
    this.add({ ...ingredients[1], name: `name${this.state.ingredients.size}` });
  }

  private add(ingredient: Ingredient): void {
    this.setState(state => ({
      ...state,
      ingredients: Map<string, Ingredient>(state.ingredients).set(
        ingredient.name,
        ingredient
      ),
      updateRecipe: true
    }));
  }

  private remove(name: string): void {
    this.setState(state => ({
      ...state,
      ingredients: Map<string, Ingredient>(state.ingredients).delete(name),
      updateRecipe: true
    }));
  }
}

export default RecipeComposer;
