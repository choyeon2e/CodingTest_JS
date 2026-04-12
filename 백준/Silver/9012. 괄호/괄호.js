"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);
const result = [];

for (let i = 1; i <= T; i++) {
  const s = input[i].trim();
  const stack = [];
  let isVPS = true;

  for (const char of s) {
    if (char === "(") {
      stack.push(char);
    } else {
      if (stack.length === 0) {
        isVPS = false;
        break;
      }
      stack.pop();
    }
  }

  if (stack.length !== 0) {
    isVPS = false;
  }

  result.push(isVPS ? "YES" : "NO");
}

console.log(result.join("\n"));
