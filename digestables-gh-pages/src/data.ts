import { IDigestable } from "./Digestable";

import { all as starwarsNames } from "starwars-names";

const digestables: IDigestable[] = starwarsNames.map(name => ({
  baseURL: new URL(`http://localhost:3000/digestables/${name}/`),
  files: ["pom.xml"],
  name
}));

export { digestables as options };
