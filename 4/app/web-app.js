"use strict";

const http = require("http");
const fibonacci = require("./fibonacci");

// server object の生成とrequest handlerの設定
http
  .createServer((req, res) => {
    // http://localhost:3000/10 へのリクエストではreq.urlは/10になるので、そこから1文字目を取り沿いてnを取得する
    const n = Number(req.url.substr(1));
    if (Number.isNaN(n)) {
      return res.end();
    }
    const result = fibonacci(n);
    res.end(result.toString());
  })
  .listen(3000);
