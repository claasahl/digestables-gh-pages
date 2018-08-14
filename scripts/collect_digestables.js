var read = require("fs-readdir-recursive");
var fs = require("fs");

const DISGESTABLE = ".digestable.json";
const BASE = "./public/digestables/";

function filter(path) {
  return path.includes(DISGESTABLE);
}

const files = read(BASE, () => true)
  .filter(filter)
  .map(file => file.replace(DISGESTABLE, "").replace("\\", "/"));
console.log(JSON.stringify(files));

var digestables = [];
files.forEach(file => {
  const json = fs.readFileSync(BASE + file + DISGESTABLE);
  const obj = JSON.parse(json);
  obj.baseURL = "./" + file;
  digestables.push(obj);
});
console.log(JSON.stringify(digestables));

var data = `import { IDigestable } from "./Digestable";\r\n`;
data += `\r\n`;
data += `function isDevelopment(): boolean {\r\n`;
data += `  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";\r\n`;
data += `}\r\n`;
data += `const BASE = isDevelopment()\r\n`;
data += `  ? "http://localhost:3000/digestables/"\r\n`;
data += `  : "https://claasahl.github.io/digestables-gh-pages/digestables/";\r\n`;
data += `\r\n`;
data += "const samples: IDigestable[] = [\r\n";
digestables.forEach(digestable => {
  data += "  {\r\n";
  data += `    baseURL: new URL("${digestable.baseURL}", BASE),\r\n`;
  data += `    files: ${JSON.stringify(digestable.files)},\r\n`;
  data += `    name: "${digestable.name}"\r\n`;
  data += "  },\r\n";
});
data += "];\r\n";
data += "\r\n";
data += "export { samples as options };\r\n";

fs.writeFileSync("src/data.ts", data);
