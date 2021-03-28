"use strict";
const fibonacci = require("../app/fibonacci");
const { workerData, parentPort } = require("worker_threads");

parentPort.postMessage(fibonacci(workerData));
