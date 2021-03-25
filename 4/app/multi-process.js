"use strict";

const { fork, setupMaster } = require("cluster");
console.log("main process", process.pid);

// sub process が実行するファイルの指定

setupMaster({ exec: `${__dirname}/web-app` });

// cpu coreの数だけprocessをforkする

const cpuCount = require("os").cpus().length;
for (let i = 0; i < cpuCount; i++) {
  const sub = fork();
  console.log("sub process", sub.process.pid);
}
