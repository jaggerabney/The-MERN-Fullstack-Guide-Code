const fs = require("fs");

const userName = "Jagger";

fs.writeFile("user-data.txt", "Name: " + userName, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("WROTE FILE");
});
