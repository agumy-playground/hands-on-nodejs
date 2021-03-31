"use strict";

const http = require("http");
const cpuCount = require("os").cpus().length;
const ThreadPool = require("../multi-thread.js/thread-pool");

const sharedArrayBuffer = new SharedArrayBuffer(4);
const int32Array = new Int32Array(sharedArrayBuffer);

const threadPool = new ThreadPool(cpuCount, `${__dirname}/fibonacci.js`, {
  workerData: int32Array,
});

// main thread 側のカウンタ
let count = 0;

http
  .createServer(async (req, res) => {
    // /callsに対してはトラッキングしているリクエスト回数を返す
    if (req.url === "/calls") {
      return res.end(`Main = ${count}, Sub = ${int32Array[0]}`);
    }
    const n = Number(req.url.substr(1));
    if (Number.isNaN(n)) {
      return res.end();
    }
    count += 1;
    const result = await threadPool.executeInThread(n);
    res.end(result.toString());
  })
  .listen(3000);
