const fs = require("fs");
const crypto = require("crypto");

fs.createReadStream("src.txt")
  .pipe(crypto.createHash("sha256"))
  .pipe(fs.createWriteStream("dest.txt"))
  .on("finish", () => console.log("done copy and encode"));
