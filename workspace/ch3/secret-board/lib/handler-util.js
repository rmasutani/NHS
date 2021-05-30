"use strict";

function handleLogout(req, res) {
  res.writeHead(401, {
    "Content-Type": "test/plain; charset=utf=8",
  });
  res.end("Logged out!");
}

function handleNotFound(req, res) {
  res.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  res.end("Page not found");
}

function handleBadRequest(req, res) {
  res.writeHead(400, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  res.end("未対応のメソッドです\n");
}

module.exports = {
  handleLogout,
  handleNotFound,
  handleBadRequest,
};