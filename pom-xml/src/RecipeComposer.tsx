import { Map } from "immutable";
import * as React from "react";
import "./RecipeComposer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as CopyToClipboard from "react-copy-to-clipboard";
import * as IngredientComponent from "./Ingredient";
import RecipeDownload from "./RecipeDownload";

import Downshift from "downshift";
import { Ingredient, ingredients } from "./ingredients/Ingredients";
import { mergeAsync } from "./ingredients/IngredientsMerger";

interface IRecipeComposerState {
  ingredients: Map<string, Ingredient>;
  recipe: string;
}

class RecipeComposer extends React.Component<any, IRecipeComposerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ingredients: Map<string, Ingredient>(),
      recipe: ""
    };
    this.handleSampleAdd = this.handleSampleAdd.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  public componentDidUpdate() {
    this.fetchRecipe();
  }

  public render() {
    return (
      <Downshift onSelect={this.add} itemToString={this.itemToString}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex
        }) => (
          <div>
            <div id="recipe-composer">
              <div className="input-group">
                <input
                  {...getInputProps()}
                  type="text"
                  className="form-control"
                  placeholder="Enter Ingredients ..."
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
                  <RecipeDownload recipe={this.state.recipe} />
                </div>
                <div className="input-group-append">
                  <CopyToClipboard text={this.state.recipe}>
                    <button className="btn btn-outline-secondary" type="button">
                      <FontAwesomeIcon icon="clipboard" />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            {isOpen ? (
              <div id="matchingIngredients">
                {ingredients
                  .filter(item => !inputValue || item.name.includes(inputValue))
                  .filter(item => !this.state.ingredients.has(item.name))
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        index,
                        item,
                        key: item.name,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: "normal"
                        }
                      })}
                    >
                      {item.name}
                    </div>
                  ))}
              </div>
            ) : null}
            <div id="ingredients">
              {this.state.ingredients.toArray().map(({ name }) => (
                <div key={name}>
                  <IngredientComponent.Ingredient
                    name={name}
                    onRemove={this.remove}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Downshift>
    );
  }

  private itemToString(selection: Ingredient): string {
    return selection ? selection.name : "";
  }

  private fetchRecipe() {
    const selectedIngredients = this.state.ingredients.toArray();
    mergeAsync(selectedIngredients).then(content => {
      if (this.state.recipe === content) {
        return;
      }
      this.setState(state => ({
        ...state,
        recipe: content
      }));
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
      )
    }));
  }

  private remove(name: string): void {
    this.setState(state => ({
      ...state,
      ingredients: Map<string, Ingredient>(state.ingredients).delete(name)
    }));
  }
}

export default RecipeComposer;
