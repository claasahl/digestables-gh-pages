import deepmerge from "deepmerge";
import * as React from "react";
import { Builder, Parser } from "xml2js";
import "./App.css";

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
    const data = `<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.github.claasahl</groupId>
    <artifactId>maven-starter-bom</artifactId>
    <version>0.1.0</version>
    <packaging>pom</packaging>
    <description>BOM (Bill of Material) Project</description>
  
    <properties>
      <!-- does this comment stay? -->
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      <version.java>1.8</version.java>
      <version.java.required>[1.8,)</version.java.required>
      <version.maven.required>[2.0.9,)</version.maven.required>
      <version.org.apache.maven.plugins.maven-compiler-plugin>3.7.0</version.org.apache.maven.plugins.maven-compiler-plugin>
      <version.org.apache.maven.plugins.maven-enforcer-plugin>3.0.0-M1</version.org.apache.maven.plugins.maven-enforcer-plugin>
      <version.org.codehaus.mojo.findbugs-maven-plugin>3.0.5</version.org.codehaus.mojo.findbugs-maven-plugin>
      <version.net.revelc.code.formatter.formatter-maven-plugin>2.7.3</version.net.revelc.code.formatter.formatter-maven-plugin>
      <version.org.apache.maven.plugins.maven-pmd-plugin>3.9.0</version.org.apache.maven.plugins.maven-pmd-plugin>
    </properties>
    <build>
      <pluginManagement>
        <plugins>
          <plugin>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>\${version.org.apache.maven.plugins.maven-compiler-plugin}</version>
            <configuration>
              <source>\${version.java}</source>
              <target>\${version.java}</target>
            </configuration>
          </plugin>
          <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>findbugs-maven-plugin</artifactId>
            <version>\${version.org.codehaus.mojo.findbugs-maven-plugin}</version>
            <executions>
              <execution>
                <goals>
                  <goal>check</goal>
                </goals>
              </execution>
            </executions>
          </plugin>
          <plugin>
            <artifactId>maven-enforcer-plugin</artifactId>
            <version>\${version.org.apache.maven.plugins.maven-enforcer-plugin}</version>
            <executions>
              <execution>
                <id>enforce-versions</id>
                <goals>
                  <goal>enforce</goal>
                </goals>
                <configuration>
                  <rules>
                    <requireMavenVersion>
                      <version>\${version.maven.required}</version>
                    </requireMavenVersion>
                    <requireJavaVersion>
                      <version>\${version.java.required}</version>
                    </requireJavaVersion>
                  </rules>
                </configuration>
              </execution>
            </executions>
          </plugin>
          <plugin>
            <groupId>net.revelc.code.formatter</groupId>
            <artifactId>formatter-maven-plugin</artifactId>
            <version>\${version.net.revelc.code.formatter.formatter-maven-plugin}</version>
            <executions>
              <execution>
                <goals>
                  <goal>format</goal>
                </goals>
              </execution>
            </executions>
          </plugin>
        </plugins>
      </pluginManagement>
      <plugins>
        <plugin>
          <artifactId>maven-enforcer-plugin</artifactId>
        </plugin>
        <plugin>
          <groupId>org.codehaus.mojo</groupId>
          <artifactId>findbugs-maven-plugin</artifactId>
        </plugin>
        <plugin>
          <groupId>net.revelc.code.formatter</groupId>
          <artifactId>formatter-maven-plugin</artifactId>
        </plugin>
      </plugins>
    </build>
  </project>
  `;
    const data2 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.github.claasahl</groupId>
    <artifactId>maven-starter-parent</artifactId>
    <packaging>pom</packaging>
    <version>0.1.0</version>
    <build>
    <plugins>
        <plugin>
          <groupId>group</groupId>
          <artifactId>artifact</artifactId>
        </plugin>
      </plugins>
      </build>
    <modules>
      <module>maven-starter</module>
      <module>maven-starter-example</module>
    </modules>
  </project>`;
    let sample3;
    const options = { explicitArray: false };
    const parser = new Parser(options);
    parser.parseString(data, (err: any, result: any) => {
      sample3 = fixArrays(result);
    });

    let sample4;
    parser.reset();
    parser.parseString(data2, (err: any, result: any) => {
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
