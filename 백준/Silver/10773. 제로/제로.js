"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const K = Number(input[0]);
const stack = [];

for (let i = 1; i <= K; i++) {
  const value = Number(input[i]);

  if (value === 0) {
    stack.pop();
  } else {
    stack.push(value);
  }
}

let answer = 0;

for (const n of stack) {
  answer += n;
}

console.log(answer);
