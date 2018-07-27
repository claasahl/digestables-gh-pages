import { IDigestable } from "./Digestable";

import { all as starwarsNames } from "starwars-names";

const samples: IDigestable[] = [
  {
    baseURL: new URL("http://localhost:3000/digestables/minimal/"),
    files: ["pom.xml"],
    name: "Minimal Digestable"
  },
  {
    baseURL: new URL("http://localhost:3000/digestables/simple/"),
    files: ["pom.xml", "README.md"],
    name: "Simple Digestable"
  }
];

const digestables: IDigestable[] = [
  ...samples,
  ...starwarsNames.map(name => ({
    baseURL: new URL(`http://localhost:3000/digestables/${name}/`),
    files: ["pom.xml"],
    name
  }))
];

export { digestables as options };
