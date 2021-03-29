"use strict";

const { Worker } = require("worker_threads");

module.exports = class ThreadPool {
  // 秋スレッド、キューを初期化
  availableWorkers = [];
  queue = [];
  constructor(size, filePtth, options) {
    // 引数で指定されたとおりにスレッドを生成してプール
    for (let i = 0; i < size; i++) {
      this.availableWorkers.push(new Worker(filePtth, options));
    }
  }

  executeInThread(arg) {
    return new Promise((resolve) => {
      const request = { resolve, arg };

      // 秋スレッドがあればリクエストを処理し、なければキューに積む
      const worker = this.availableWorkers.pop();
      worker ? this.#process(worker, request) : this.queue.push(request);
    });
  }

  //実際にスレッドで処理を実行するprivateメソッド
  #process(worker, { resolve, arg }) {
    worker.once("message", (result) => {
      // request元に結果を返す
      resolve(result);

      // queueに積まれたリクエスとがあれば処理し、なければ空きスレッドに戻す
      const request = this.queue.shift();
      request
        ? this.#process(worker, request)
        : this.availableWorkers.push(worker);
    });
  }
};
