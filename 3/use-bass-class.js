const { Stream } = require("node:stream");

const myWriteable = new Stream.Writable({
  write(chunk, encoding, callback) {},
});
