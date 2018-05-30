import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

import deepmerge from "deepmerge";
import * as CopyToClipboard from "react-copy-to-clipboard";
import { Builder, Parser } from "xml2js";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";
import Sample1 from "./recipes/Sample1";
import Sample2 from "./recipes/Sample2";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

function test(value: string, name: string): string {
  return `${value}[${name}]`;
}

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

interface IIngredient {
  name: string;
  xml: string;
}

interface IAppState {
  ingredients: IIngredient[];
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ingredients: []
    };
    this.handleButton = this.handleButton.bind(this);
  }

  public render() {
    let sample3;
    const options = { explicitArray: false, attrValueProcessors: [test] };
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
    const dataUrl = this.generateDataURL(sample);

    return (
      <div className="container grid-wrapper">
        <Recipe />
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
                href={dataUrl}
                download="pom.xml"
              >
                <FontAwesomeIcon icon="cloud-download-alt" />
              </a>
            </div>
            <div className="input-group-append">
              <CopyToClipboard text={sample}>
                <button className="btn btn-outline-secondary" type="button">
                  <FontAwesomeIcon icon="clipboard" />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div id="recipes">
          {this.state.ingredients.map(({ name, xml }) => (
            <div key="${name}" className="h1">
              <Ingredient
                name={name}
                xmlContent={xml}
                onRemove={this.removeIngredient}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  private generateDataURL(content: string): string {
    return "data:text/plain;charset=utf-8," + encodeURIComponent(content);
  }

  private removeIngredient(name: string) {
    // do something
  }

  private handleButton(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const numIngredients = this.state.ingredients.length;
    const ingredient = {
      name: `name${numIngredients}`,
      xml: "<data></data>"
    };
    this.setState(state => ({
      ingredients: [...state.ingredients, ingredient]
    }));
  }
}

export default App;
