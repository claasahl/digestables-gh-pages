import { IDigestable } from "./Digestable";

function isDevelopment(): boolean {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
}
const BASE = isDevelopment()
  ? "http://localhost:3000/digestables/"
  : "https://claasahl.github.io/digestables-gh-pages/digestables/";

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
  },
  {
    baseURL: new URL("./hello-world/", BASE),
    files: ["pom.xml", "src/main/java/org/github/claasahl/HelloWorld.java"],
    name: "Hello World"
  },
  {
    baseURL: new URL("./example-no-1/", BASE),
    files: ["pom.xml"],
    name: "Example #1"
  }
];

export { samples as options };
