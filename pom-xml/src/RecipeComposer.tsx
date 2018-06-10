import { Map } from "immutable";
import * as React from "react";
import "./RecipeComposer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as CopyToClipboard from "react-copy-to-clipboard";
import Ingredient from "./Ingredient";

import Sample from "./recipes/sample-recipe.xml";

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
    this.remove = this.remove.bind(this);
  }
  public render() {
    const recipe = "test recipe";
    const dataUrl = this.generateDataURL(recipe);

    return (
      <div>
        <div id="recipe-composer">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
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
              <a
                className="btn btn-outline-secondary"
                href={dataUrl}
                download="pom.xml"
              >
                <FontAwesomeIcon icon="cloud-download-alt" />
              </a>
            </div>
            <div className="input-group-append">
              <CopyToClipboard text={recipe}>
                <button className="btn btn-outline-secondary" type="button">
                  <FontAwesomeIcon icon="clipboard" />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div id="ingredients">
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
      </div>
    );
  }

  private async fetchAndAppendIngredient() {
    const response = await fetch(Sample);
    const xml = await response.text();
    this.add({ name: `name${this.state.ingredients.size}`, xml });
  }

  private generateDataURL(content: string): string {
    return "data:text/plain;charset=utf-8," + encodeURIComponent(content);
  }

  private handleSampleAdd(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    this.add({ name: "test", xml: "<data></data>" });

    this.fetchAndAppendIngredient();
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
