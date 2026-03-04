"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const checkMap = new Map();

for (let i = 1; i <= n; i++) {
  const [name, status] = input[i].split(" ");

  if (status === "enter") {
    checkMap.set(name, true);
  } else {
    checkMap.delete(name);
  }
}

const result = [...checkMap.keys()].sort().reverse().join("\n");

console.log(result);
