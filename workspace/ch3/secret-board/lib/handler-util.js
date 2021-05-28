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

module.exports = {
  handleLogout,
  handleNotFound,
};
