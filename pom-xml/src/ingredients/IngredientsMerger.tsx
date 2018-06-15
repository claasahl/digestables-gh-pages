// FIXME: changed from "export = deepmerge;" to "export default deepmerge;"
import deepmerge from "deepmerge";
import { Builder, Parser } from "xml2js";
import { Ingredient } from "./Ingredients";

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

export async function mergeIngredients(
  ingredients: Ingredient[]
): Promise<string> {
  if (!ingredients || ingredients.length === 0) {
    return "";
  }
  let merged = await parseAsync(await ingredients[0].xml());
  for (let a = 1; a < ingredients.length; a++) {
    const xml = await parseAsync(await ingredients[a].xml());
    merged = deepmerge(merged, xml);
  }
  const builder = new Builder();
  return builder.buildObject(merged);
}
