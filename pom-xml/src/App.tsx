import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

// FIXME: changed from "export = deepmerge;" to "export default deepmerge;"
import deepmerge from "deepmerge";
import { Builder, Parser } from "xml2js";
import RecipeComposer from "./RecipeComposer";
import Sample1 from "./recipes/Sample1";
import Sample2 from "./recipes/Sample2";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

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

    return (
      <div className="container grid-wrapper">
        <RecipeComposer />
        {JSON.stringify(sample)}
      </div>
    );
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
