"use strict";
import $ from "jquery";
const block = $("#block");
const scailingButton = $("#scailing-button");
const moveButton = $("#move-button");

moveButton.on("click", () => {
  block.animate({ marginLeft: "500px" }, 2000);
  block.animate({ marginLeft: "20px" }, 2000);
});

scailingButton.on("click", () => {
  block.animate({ width: "200pt", height: "200pt" }, 2000);
  block.animate({ width: "100pt", height: "100pt" }, 2000);
});
