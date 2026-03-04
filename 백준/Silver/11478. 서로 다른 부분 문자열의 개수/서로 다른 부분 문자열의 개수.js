"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const S = input[0].trim();
const subset = new Set();

for (let i = 0; i < S.length; i++) {
  for (let j = i + 1; j <= S.length; j++) {
    subset.add(S.substring(i, j));
  }
}

console.log(subset.size);
