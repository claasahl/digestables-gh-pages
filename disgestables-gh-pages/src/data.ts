import { IDigestable } from "./digestables/Digestable";

import { all as starwarsNames } from "starwars-names";

const digestables: IDigestable[] = starwarsNames.map(name => ({
  files: [],
  name,
  pom: "pom.xml"
}));

export { digestables as options };
