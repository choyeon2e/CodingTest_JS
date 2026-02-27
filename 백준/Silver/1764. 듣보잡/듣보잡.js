"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const unheard = new Set(); //듣도 못한 사람

for (let i = 1; i <= N; i++) {
  unheard.add(input[i].trim());
}

const result = [];

for (let i = N + 1; i <= N + M; i++) {
  const name = input[i].trim();

  if (unheard.has(name)) {
    result.push(name);
  }
}

result.sort();

console.log(result.length);
if (result.length > 0) {
  console.log(result.join("\n"));
}
