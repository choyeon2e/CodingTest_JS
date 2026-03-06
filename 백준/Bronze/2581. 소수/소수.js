"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const M = +input[0];
const N = +input[1];

let sum = 0;
let min = 0;

for (let i = M; i <= N; i++) {
  if (i === 1) continue;
  let isPrime = true;

  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) {
    if (sum === 0) min = i;
    sum += i;
  }
}

if (sum === 0) {
  console.log(-1);
} else {
  console.log(sum);
  console.log(min);
}
