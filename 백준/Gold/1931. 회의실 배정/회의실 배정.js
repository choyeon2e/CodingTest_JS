"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const meetings = [];

for (let i = 1; i <= N; i++) {
  meetings.push(input[i].split(" ").map(Number));
}

meetings.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  }
  return a[1] - b[1];
});

let count = 0;
let current = 0;

for (let i = 0; i < N; i++) {
  const [start, end] = meetings[i];

  if (start >= current) {
    count++;
    current = end;
  }
}

console.log(count);
