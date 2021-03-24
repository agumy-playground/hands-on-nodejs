const fs = require("fs");
const stream = require("stream");

// fs.createReadStream("no-such-file.txt")
//   .on("error", (error) => console.log(error.message))
//   .pipe(fs.createWriteStream("dest.txt"))
//   .on("error", (error) => cojsole.log(error.message));

stream.pipeline(
  fs.createReadStream("no-such-file.txt"),
  fs.createWriteStream("dest.txt"),
  (err) => (err ? console.log(err.message) : console.log("done"))
);
