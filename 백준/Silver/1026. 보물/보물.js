"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const N = +input[line++];
const A = input[line++].split(" ").map(Number);
const B = input[line].split(" ").map(Number);

A.sort((a, b) => a - b);
B.sort((a, b) => b - a);

let S = 0;
for (let i = 0; i < N; i++) {
  S += A[i] * B[i];
}

console.log(S);
