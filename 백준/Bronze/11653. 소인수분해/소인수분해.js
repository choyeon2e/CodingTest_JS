"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let N = Number(input[0]);

if (N === 1) process.exit();

let i = 2;
while (N > 1) {
  if (N % i === 0) {
    console.log(i);
    N /= i;
  } else i++;
}
