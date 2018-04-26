import * as React from "react";
import { Parser } from "xml2js";
import "./App.css";

import logo from "./logo.svg";

class App extends React.Component {
  public render() {
    const data = `<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.github.claasahl</groupId>
    <artifactId>maven-starter-parent</artifactId>
    <packaging>pom</packaging>
    <version>0.1.0</version>
    <modules>
      <module>maven-starter</module>
      <module>maven-starter-example</module>
    </modules>
  </project>
  `;
    let sample3;
    const parser = new Parser();
    parser.parseString(data, (err: any, result: any) => {
      sample3 = result;
    });

    const sample = JSON.stringify({ test: "testttt" });
    const sample2 = JSON.stringify(sample3);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>{sample2}</code> and save to reload.
        </p>
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
