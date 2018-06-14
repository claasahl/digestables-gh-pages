// FIXME: changed from "export = deepmerge;" to "export default deepmerge;"
import deepmerge from "deepmerge";
import { Builder, Parser } from "xml2js";
import Sample1 from "./../recipes/Sample1";
import Sample2 from "./../recipes/Sample2";

const options = { explicitArray: false };

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

function parseAsync(xml: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const parser = new Parser(options);
    parser.parseString(xml, (err: any, result: any) => {
      if (err) {
        return reject(err);
      }
      resolve(fixArrays(result));
    });
  });
}

export async function mergeAsync() {
  const sample1 = await parseAsync(Sample1);
  const sample2 = await parseAsync(Sample2);

  const builder = new Builder();
  const merged = deepmerge(sample1, sample2);
  return builder.buildObject(merged);
}

export async function merger22() {
  return await parseAsync(Sample1);
}

export default mergeAsync;
