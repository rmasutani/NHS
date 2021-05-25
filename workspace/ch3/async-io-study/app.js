"use strict";
const fs = require("fs");
const fileName = "./test.txt";
// 非同期IO
// for (let count = 0; count < 500; count++) {
//   fs.appendFile(fileName, "あ", "utf8", () => {}); // callback function
//   fs.appendFile(fileName, "い", "utf8", () => {});
//   fs.appendFile(fileName, "う", "utf8", () => {});
//   fs.appendFile(fileName, "え", "utf8", () => {});
//   fs.appendFile(fileName, "お", "utf8", () => {});
//   fs.appendFile(fileName, "\n", "utf8", () => {});
// }

// 同期IO
for (let count = 0; count < 500; count++) {
  fs.appendFileSync(fileName, "A", "utf8");
  fs.appendFileSync(fileName, "I", "utf8");
  fs.appendFileSync(fileName, "U", "utf8");
  fs.appendFileSync(fileName, "E", "utf8");
  fs.appendFileSync(fileName, "O", "utf8");
  fs.appendFileSync(fileName, "\n", "utf8");
}
