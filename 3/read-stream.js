const fs = require("fs");
const stream = require("stream");

// const readStream = fs.createReadStream("src.txt");

// readStream
//   .on("readable", () => {
//     console.log("readable");

//     let chunk;
//     while ((chunk = readStream.read()) !== null) {
//       console.log(`chunk: ${chunk.toString()}`);
//     }
//   })
//   .on("end", () => console.log("end"));

class HelloReabableStream extends stream.Readable {
  constructor(options) {
    super(options);
    this.languages = ["JavaScript", "Python", "Java", "C#"];
  }

  _read(size) {
    console.log("_read");
    let language;
    while ((language = this.languages.shift())) {
      if (!this.push(`Hello, ${language}!\n`)) {
        console.log("読み込み中断");
        return;
      }
    }
    console.log("読み込み完了");
    this.push(null);
  }
}

const helloReadableStream = new HelloReabableStream();
helloReadableStream
  .on("readable", () => {
    console.log("readable");
    let chunk;
    while ((chunk = helloReadableStream.read()) !== null) {
      console.log(`chunk: ${chunk.toString()}`);
    }
  })
  .on("end", () => console.log("end"));

// const fileWriteStream = fs.createWriteStream("dest.txt");
// fileWriteStream.write("Hello\n");
// fileWriteStream.write("World\n");
// fileWriteStream.end();

// console.log(fs.readFileSync("dest.txt", "utf-8"));

class DelayLogStream extends stream.Writable {
  constructor(options) {
    super({ objectMode: true, ...options });
  }

  _write(chunk, encoding, callback) {
    console.log("_write");

    const { message, delay } = chunk;
    setTimeout(() => {
      console.log(message);
      callback();
    }, delay);
  }
}

const delayLogStream = new DelayLogStream();

delayLogStream.write({ message: "Hi", delay: 0 });
delayLogStream.write({ message: "Thank you", delay: 1000 });
delayLogStream.write({ message: "Bye", delay: 100 });
