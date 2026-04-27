"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = input[0]
  .split("")
  .map(Number)
  .sort((a, b) => b - a);

console.log(N.join(""));
