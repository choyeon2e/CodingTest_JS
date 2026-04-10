"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

let answer = 0;
let count = 0;

for (let i = 1; i <= N; i++) {
  if (N % i === 0) {
    answer = i;
    count++;
  }

  if (count === K) {
    console.log(answer);
    process.exit();
  }
}

if (count < K) {
  console.log(0);
}
