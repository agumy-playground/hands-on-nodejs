"use strict";

const http = require("http");
const fibonacci = require("../app/fibonacci");
const pid = process.pid;

// IPCでmessageを受信して司令されたport番号でweb serverを起動
process.on("message", (port) => {
  console.log(pid, `port ${port} で web serverを起動します`);
  http
    .createServer((req, res) => {
      const n = Number(req.url.substr(1));
      if (Number.isNaN(n)) {
        return res.end();
      }
      const response = fibonacci(n);
      // 結果をipcで送信
      process.send({ pid, response });
      res.end(response.toString());
    })
    .listen(port);
});
