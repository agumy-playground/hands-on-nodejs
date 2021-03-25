"use strict";

const { Worker, threadId } = require("worker_threads");

console.log("main thread", threadId);

// cpu core数だけthreadを起動
const cpuCount = require("os").cpus().length;
for (let i = 0; i < cpuCount; i++) {
  // sub threadで実行するファイルパスを指定してWorkerをnewする
  const worker = new Worker(`${__dirname}/../app/web-app.js`);
  console.log("sub thread", worker.threadId);
}
