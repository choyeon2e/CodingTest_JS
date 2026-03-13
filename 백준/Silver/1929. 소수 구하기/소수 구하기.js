"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ");

const M = Number(input[0]);
const N = Number(input[1]);

function isPrime(num) {
  if (num < 2) return false; // 0, 1 소수 x

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const results = [];
for (let i = M; i <= N; i++) {
  if (isPrime(i)) {
    results.push(i);
  }
}

console.log(results.join("\n"));
