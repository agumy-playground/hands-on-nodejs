const fs = require("fs");
const crypto = require("crypto");

const srcReadStream = fs.createReadStream("src.txt");
srcReadStream
  .pipe(fs.createWriteStream("dest.txt"))
  .on("finish", () => console.log("分岐１完了"));

srcReadStream
  .pipe(crypto.createHash("sha256"))
  .pipe(fs.createWriteStream("dest.crypto.txt"))
  .on("finish", () => console.log("分岐２完了"));
