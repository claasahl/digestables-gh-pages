import { IDigestable } from "./digestables/Digestable";

import { all as starwarsNames } from "starwars-names";

const digestables: IDigestable[] = starwarsNames.map(name => ({
  files: ["pom.xml"],
  name
}));

export { digestables as options };
