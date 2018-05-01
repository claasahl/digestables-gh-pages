import deepmerge from "deepmerge";
import * as React from "react";
import { Builder, Parser } from "xml2js";
import "./App.css";
import Sample1 from "./recipes/Sample1";
import Sample2 from "./recipes/Sample2";

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
