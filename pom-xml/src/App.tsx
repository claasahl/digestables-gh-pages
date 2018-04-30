import deepmerge from "deepmerge";
import * as React from "react";
import { Builder, Parser } from "xml2js";
import "./App.css";
import Sample1 from "./recipes/Sample1";
import Sample2 from "./recipes/Sample2";

import logo from "./logo.svg";

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

class App extends React.Component {
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <h3>Big Sample:</h3>
          <code>{JSON.stringify(sample3)}</code>
        </div>
        <div>
          <h3>Small Sample:</h3>
          <code>{JSON.stringify(sample4)}</code>
        </div>
        <div>
          <h3>Merged Samples:</h3>
          <code>{JSON.stringify(sample5)}</code>
        </div>
        <a
          href={"data:text/plain;charset=utf-8," + encodeURIComponent(sample)}
          download="pom.xml"
        >
          recipe
        </a>
      </div>
    );
  }
}

export default App;
