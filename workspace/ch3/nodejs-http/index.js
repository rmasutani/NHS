"use strict";
const http = require("http");
const auth = require("http-auth");
const basic = auth.basic(
  { realm: "Enquetes Area." },
  (username, password, callback) => {
    callback(username == "guest" && password === "xaXZJQmE");
  }
);

const server = http
  .createServer(basic, (req, res) => {
    // Logging
    const now = new Date();
    console.info("[" + now + "] Requested by " + req.socket.remoteAddress);
    // リクエストがきた時の挙動
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    switch (req.method) {
      case "GET":
        const fs = require("fs");
        const rs = fs.createReadStream("./form.html"); // GETした時にフォームを表示
        rs.pipe(res); // Node.js では Stream の形式のデータは、読み込み用の Stream と書き込み用の Stream を繋つないで そのままデータを受け渡すことができます
        break;
      case "POST":
        let rawData = "";
        req
          .on("data", (chunk) => {
            rawData = rawData + chunk;
          })
          .on("end", () => {
            console.info(rawData);
            const decoded = decodeURIComponent(rawData);
            console.info("[" + now + "] 投稿: " + rawData);
            res.write(
              '<!DOCTYPE html><html lang="ja"><body><h1>' +
                decoded +
                "が投稿されました</h1></body></html>"
            );
            res.end();
          });
        break;
      default:
        break;
    }
  })
  .on("error", (e) => {
    console.error("[" + new Date() + "] Server error", e);
  })
  .on("clientError", (e) => {
    console.error("[" + new Date() + "] Client error", e);
  });

const port = 8000;
server.listen(port, () => {
  console.log("Listening on port: " + port);
});
