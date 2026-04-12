"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const prefixSum = new Array(N + 1).fill(0); //누적합
for (let i = 0; i < N; i++) {
  prefixSum[i + 1] = prefixSum[i] + arr[i];
}

let result = "";
for (let x = 2; x < 2 + M; x++) {
  const [i, j] = input[x].split(" ").map(Number);
  result += prefixSum[j] - prefixSum[i - 1] + "\n";
}

console.log(result.trim());
