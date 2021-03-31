"use strict";

const fibonacci = require("../app/fibonacci");

//workerDataでInt32Array instanceを受け取る
const { workerData: int32Array, parentPort } = require("worker_threads");

parentPort.on("message", (n) => {
  parentPort.postMessage(fibonacci(n));
  // 処理のたびに最初の値をインクリメントする
  Atomics.add(int32Array, 0, 1);
});
