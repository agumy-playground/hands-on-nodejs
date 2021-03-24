const stream = require("stream");
const util = require("util");
const fs = require("fs");

class HelloReadableStream extends stream.Readable {
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

const helloReadableStream1 = new HelloReadableStream().on("end", () =>
  console.log("done")
);

(async () => {
  for await (const data of helloReadableStream1) {
    console.log("data", data.toString());
  }
})();

async function* asyncGenerator() {
  let i = 0;
  while (i <= 3) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    yield `${i++}`;
  }
}

const asyncIterable = asyncGenerator();

const readableFromAsyncIterable = stream.Readable.from(asyncIterable);

readableFromAsyncIterable.on("data", console.log);

util.promisify(stream.pipeline)(
  asyncGenerator(),
  fs.createWriteStream("dest.txt")
);
