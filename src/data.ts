import { IDigestable } from "./Digestable";

import { all as starwarsNames } from "starwars-names";

function isDevelopment(): boolean {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
}
const BASE = isDevelopment()
  ? "http://localhost:3000/digestables/"
  : "https://claasahl.github.io/maven-starter-project/";

const samples: IDigestable[] = [
  {
    baseURL: new URL("./minimal/", BASE),
    files: ["pom.xml"],
    name: "Minimal Digestable"
  },
  {
    baseURL: new URL("./simple/", BASE),
    files: ["pom.xml", "README.md"],
    name: "Simple Digestable"
  }
];

const digestables: IDigestable[] = [
  ...samples,
  ...starwarsNames.map(name => ({
    baseURL: new URL(`./${name}/`, BASE),
    files: ["pom.xml"],
    name
  }))
];

export { digestables as options };
