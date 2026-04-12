"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const stack = [];
const result = [];

for (let i = 1; i <= N; i++) {
  const [command, value] = input[i].split(" ");

  if (command === "push") {
    stack.push(Number(value));
  } else if (command === "pop") {
    result.push(stack.length === 0 ? -1 : stack.pop());
  } else if (command === "size") {
    result.push(stack.length);
  } else if (command === "empty") {
    result.push(stack.length === 0 ? 1 : 0);
  } else if (command === "top") {
    result.push(stack.length === 0 ? -1 : stack[stack.length - 1]);
  }
}

console.log(result.join("\n"));
