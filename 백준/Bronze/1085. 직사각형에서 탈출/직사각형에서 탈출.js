"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [x, y, w, h] = input[0].split(" ").map(Number);
const distances = [x, w - x, y, h - y];

console.log(Math.min(...distances));
