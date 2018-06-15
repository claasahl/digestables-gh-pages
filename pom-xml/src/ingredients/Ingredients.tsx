import Sample1 from "./data/sample1.xml";
import Sample2 from "./data/sample2.xml";

async function fetchXML(url: string): Promise<string> {
  const response = await fetch(url);
  return await response.text();
}

export class CachedIngredient implements Ingredient {
  public name: string;
  public url: string;
  private xmlFetched: boolean;
  private xmlData: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
    this.xmlFetched = false;
    this.xmlData = "test";
    this.xml = this.xml.bind(this);
  }

  public xml(): Promise<string> {
    if (this.xmlFetched) {
      return new Promise((resolve, reject) => resolve(this.xmlData));
    }
    const fetcher = fetchXML(this.url);
    fetcher.then(value => {
      this.xmlData = value;
      this.xmlFetched = true;
    });
    return fetcher;
  }
}

export interface Ingredient {
  name: string;
  url: string;
  xml: () => Promise<string>;
}

export const ingredients: Ingredient[] = [
  new CachedIngredient("sample1", Sample1),
  new CachedIngredient("sample2", Sample2)
];
export default ingredients;
