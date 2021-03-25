"use strict";

const child_process = require("child_process");

child_process.exec(
  'echo "Hello, World!"',
  // 成功した場合、commandの標準出力を取得して表示
  (err, stdout) => (err ? console.error(err) : console.log(stdout))
);
