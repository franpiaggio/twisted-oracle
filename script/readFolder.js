const dirTree = require("directory-tree");
const fs = require("fs");
const tree = dirTree("./project/public/img");
// stringify JSON Object
const jsonContent = JSON.stringify(tree);
console.log(tree);

fs.writeFile("./project/src/cards.json", jsonContent, "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }

  console.log("JSON file has been saved.");
});
