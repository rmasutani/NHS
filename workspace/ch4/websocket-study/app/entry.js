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

const loadavg = $("#loadavg");

// setInterval(() => {
//   $.get('/server-status', {}, (data) => {
//     loadavg.text(data.loadavg.toString());
//   });
// }, 10);

// AJAX の時には 10 ミリ秒というポーリング間隔は、クライアント側に設定
// WebSocket のイベントの発行間隔に関しては、サーバー上の Node.js のコードに記述
import io from "socket.io-client";
const socket = io("http://localhost:8000");
socket.on("server-status", (data) => {
  loadavg.text(data.loadavg.toString());
});
