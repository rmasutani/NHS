"use strict";
const http = require("http");
const auth = require("http-auth");
const router = require("./lib/router");

const basic = auth.basic({
  realm: "Enter usename and passowod",
  file: "./users.htpasswd",
});

const server = http
  .createServer(basic, (req, res) => {
    router.route(req, res);
  })
  .on("error", (e) => {
    console.error("Server error", e);
  })
  .on("clientError", (e) => {
    console.error("Client Error");
  });

const port = 8000;
server.listen(port, () => {
  console.info("listening on " + port);
});