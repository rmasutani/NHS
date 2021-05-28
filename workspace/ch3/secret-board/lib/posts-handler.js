"use strict";
const pug = require("pug");
const contents = [];

function handle(req, res) {
  switch (req.method) {
    case "GET":
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end(pug.renderFile("./views/posts.pug"));
      break;
    case "POST":
      // POSTの処理
      let body = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          const decoded = decodeURIComponent(body);
          const params = new URLSearchParams(decoded);
          const content = params.get("content");
          contents.push(chunk);
          console.log("[" + new Date() + "]" + "Post saved!!");
          console.log("Your post: " + content);
          handleRedirectPosts(req, res);
        });
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req, res) {
  // 今回はステータスコードとして以前使用した 302 - Found ではなく、 303 - See Other を利用しています。
  // 303 は POST でアクセスした際に、その処理の終了後、 GET でも同じパスにアクセスし直してほしい時に利用するステータスコードです。
  res.writeHead(303, {
    Location: "/posts",
  });
  res.end();
}

module.exports = {
  handle,
};
