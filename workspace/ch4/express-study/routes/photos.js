"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  // send を使うとレスポンスのボディに文字を直接埋め込める
  res.send("Some photos");
});

module.exports = router;
