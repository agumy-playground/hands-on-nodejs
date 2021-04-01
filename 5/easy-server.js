"user strict";

const todos = [
  { id: 1, title: "name", completed: false },
  { id: 2, title: "下書き", completed: true },
];

const http = require("http");

const server = http
  .createServer((req, res) => {
    // request の url や http method に応じて適切なレスポンスを返す
    if (req.url === "/api/todos") {
      if (req.method === "GET") {
        // get method の場合、全todoをjson形式で返す
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(todos));
      }
      // get 以外のhttp methodはサポートしないため405(method not allowed)
      res.statusCode = 405;
    } else {
      // api/todos 以外のurlはないので404
      res.statusCode = 404;
    }
  })
  .listen(3000);

http
  .request("http://localhost:3000/api/todos", (res) => {
    let responseData = "";
    console.log("statusCode", res.statusCode);
    res.on("data", (chunk) => (responseData += chunk));
    res.on("end", () => console.log("responseData", JSON.parse(responseData)));
  })
  .end();
