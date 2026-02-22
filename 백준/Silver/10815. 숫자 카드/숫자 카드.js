"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const numCards = new Set(input[1].split(" ").map(Number));

const M = +input[2];
const checkCards = input[3].split(" ").map(Number);

const result = [];
for (let i = 0; i < M; i++) {
  if (numCards.has(checkCards[i])) {
    result.push(1);
  } else {
    result.push(0);
  }
}

console.log(result.join(" "));