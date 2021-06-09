"use strict";
import dc from "damage-calc";
const root = document.getElementById("root");
root.innerHTML =
  "<p> ATT 100, DEF 50, PIERCE 30, damage is " +
  dc.effectiveDamage(100, 50, 30) +
  "</p>";
