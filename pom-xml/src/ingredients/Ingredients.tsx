import Sample1 from "./data/sample1.xml";
import Sample2 from "./data/sample2.xml";

async function fetchXML(url: string): Promise<string> {
  const response = await fetch(url);
  return await response.text();
}

export interface Ingredient {
  name: string;
  url: string;
  xml: () => Promise<string>;
}

export const ingredients: Ingredient[] = [
  { name: "sample1", url: Sample1, xml: () => fetchXML(Sample1) },
  { name: "sample2", url: Sample2, xml: () => fetchXML(Sample2) }
];
export default ingredients;
