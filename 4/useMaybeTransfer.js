"use strict";

const worker_threads = require("worker_threads");
const perf_hooks = require("perf_hooks");

function useMaybeTransfer(transfer) {
  // 1gb の array bufferを生成
  const buffer = new ArrayBuffer(1024 * 1024 * 1024);
  // 時刻を記録
  const start = perf_hooks.performance.now();
  new worker_threads.Worker(`${__dirname}/maybe-transfer.js`, {
    workerData: { buffer, transfer },
    transferList: transfer ? [buffer] : [],
  }).on("message", () => console.log(perf_hooks.performance.now() - start));

  console.log(buffer);
}

useMaybeTransfer(true);

useMaybeTransfer(false);
