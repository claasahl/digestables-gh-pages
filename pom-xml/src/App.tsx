import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

import deepmerge from "deepmerge";
import { Builder, Parser } from "xml2js";
import Sample1 from "./recipes/Sample1";
import Sample2 from "./recipes/Sample2";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

function fixArrays(pomXml: any) {
  const clonedPomXml = Object.assign(pomXml);
  if (
    clonedPomXml.project.build &&
    clonedPomXml.project.build.plugins &&
    clonedPomXml.project.build.plugins.plugin &&
    !(clonedPomXml.project.build.plugins.plugin instanceof Array)
  ) {
    clonedPomXml.project.build.plugins.plugin = [
      clonedPomXml.project.build.plugins.plugin
    ];
  }
  if (
    clonedPomXml.project.build &&
    clonedPomXml.project.build.pluginManagement &&
    clonedPomXml.project.build.pluginManagement.plugins &&
    clonedPomXml.project.build.pluginManagement.plugins.plugin &&
    !(
      clonedPomXml.project.build.pluginManagement.plugins.plugin instanceof
      Array
    )
  ) {
    clonedPomXml.project.build.pluginManagement.plugins.plugin = [
      clonedPomXml.project.build.pluginManagement.plugins.plugin
    ];
  }
  return clonedPomXml;
}

interface IRecipe {
  name: string;
  xml: string;
}

interface IAppState {
  recipes: IRecipe[];
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipes: []
    };
    this.handleButton = this.handleButton.bind(this);
  }

  public render() {
    let sample3;
    const options = { explicitArray: false };
    const parser = new Parser(options);
    parser.parseString(Sample1, (err: any, result: any) => {
      sample3 = fixArrays(result);
    });

    let sample4;
    parser.reset();
    parser.parseString(Sample2, (err: any, result: any) => {
      sample4 = fixArrays(result);
    });

    const builder = new Builder();
    const sample5 = deepmerge(sample3, sample4);
    const sample = builder.buildObject(sample5);
    const recipes = this.state.recipes;

    return (
      <div className="container grid-wrapper">
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
                onClick={this.handleButton}
                type="button"
              >
                <FontAwesomeIcon icon="plus-square" />
              </button>
            </div>
            <div className="input-group-append">
              <a
                className="btn btn-outline-secondary"
                href={
                  "data:text/plain;charset=utf-8," + encodeURIComponent(sample)
                }
                download="pom.xml"
              >
                <FontAwesomeIcon icon="cloud-download-alt" />
              </a>
            </div>
          </div>
        </div>
        <div id="recipes">
          {recipes.map(({ name, xml }) => (
            <div key="${name}" className="h1">
              <span className="badge badge-light">
                ${name}
                <FontAwesomeIcon icon="window-close" transform="shrink-5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  private handleButton(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const numRecipes = this.state.recipes.length;
    const recipe = {
      name: `name${numRecipes}`,
      xml: "<data></data>"
    };
    this.setState(state => ({
      recipes: [...state.recipes, recipe]
    }));
  }
}

export default App;
