// FIXME: changed from "export = deepmerge;" to "export default deepmerge;"
import deepmerge from "deepmerge";
import { Builder, Parser } from "xml2js";
import Sample1 from "./../recipes/Sample1";
import Sample2 from "./../recipes/Sample2";

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

export function merger() {
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
  return builder.buildObject(sample5);
}

export default merger;
