const fs = require("fs");

function copyFileWithStream(src, dest, cb) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dest)).on("finish", cb);
}

fs.writeFileSync("src.txt", "Hello, World!");

copyFileWithStream("src.txt", "dest.txt", () => console.log("done copy!"));
