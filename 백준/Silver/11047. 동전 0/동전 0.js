"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, K] = input[0].split(" ").map(Number);
const A = input.slice(1).map(Number);

let count = 0;

for (let i = N - 1; i >= 0; i--) {
  if (A[i] <= K) {
    count += Math.floor(K / A[i]);
    K = K % A[i];
  }

  if (K === 0) break;
}

console.log(count);
