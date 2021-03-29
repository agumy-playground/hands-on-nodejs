"use strict";
const fibonacci = require("../app/fibonacci");
const { parentPort } = require("worker_threads");

// message event の関しによりメインスレッドからのメッセージの受信を待機
// 受信したrあフィボナッチ数を計算して結果をめいんすれっどに送信
parentPort.on("message", (n) => parentPort.postMessage(fibonacci(n)));
