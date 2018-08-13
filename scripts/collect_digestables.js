var read = require("fs-readdir-recursive");

function filter(path) {
  console.log(
    JSON.stringify({
      path,
      test: path.includes(".digestable.json")
    })
  );
  return path.includes(".digestable.json");
}

const files = read("./public/digestables/", () => true).filter(filter);
console.log(JSON.stringify(files));
