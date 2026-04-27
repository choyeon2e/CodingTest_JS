"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
let Narr = [];

for (let i = 1; i <= N; i++) {
  Narr.push(Number(input[i]));
}

Narr.sort((a, b) => a - b);

console.log(Narr.join("\n"));
