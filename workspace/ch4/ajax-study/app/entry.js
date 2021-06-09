"use strict";
import $ from "jquery";
const block = $("#block");
const scalingButton = $("#scaling-button");

scalingButton.click(() => {
  block.animate({ width: "200pt", height: "200pt" }, 2000);
  block.animate({ width: "100pt", height: "100pt" }, 2000);
});

const movingButton = $("#moving-button");

movingButton.click(() => {
  block.animate({ marginLeft: "500px" }, 500);
  block.animate({ marginLeft: "20px" }, 1000);
});

// AJAX通信を行うクライアントJavaScript
const loadavg = $("#loadavg");

setInterval(() => {
  // GETメソッドで/server-statusにデータを渡さずにアクセス
  $.get("/server-status", {}, (data) => {
    loadavg.text(data.loadavg.toString()); // JSONでもJSと同じ方法でプロパティを取得できる
  });
}, 10);
