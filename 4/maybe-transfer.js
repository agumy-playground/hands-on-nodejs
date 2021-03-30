"use strict";

const { parentPort, workerData } = require("worker_threads");

parentPort.postMessage(
  workerData.buffer,
  /* 転送オブジェクトを指定 */
  workerData.transfer ? [workerData.buffer] : []
);
