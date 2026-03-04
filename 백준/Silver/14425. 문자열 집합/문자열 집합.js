"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const checkMap = new Map();
let count = 0;

for (let i = 1; i <= N; i++) {
  checkMap.set(input[i], true);
}

for (let i = N + 1; i <= N + M; i++) {
  if (checkMap.has(input[i])) {
    count++;
  }
}

console.log(count);
