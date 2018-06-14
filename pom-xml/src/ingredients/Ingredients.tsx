import Sample1 from "./data/sample1.xml";
import Sample2 from "./data/sample2.xml";

export interface Ingredient {
  name: string;
  url: string;
}

export const ingredients: Ingredient[] = [
  { name: "sample1", url: Sample1 },
  { name: "sample2", url: Sample2 }
];
export default ingredients;
