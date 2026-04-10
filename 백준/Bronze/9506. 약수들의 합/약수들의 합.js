"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

for (let i = 0; i < input.length; i++) {
  let sum = 0;
  let arr = [];

  const N = Number(input[i]);

  if (N === -1) break;

  for (let j = 1; j < N; j++) {
    if (N % j === 0) {
      sum += j;
      arr.push(j);
    }
  }

  if (sum === N) {
    console.log(`${N} = ${arr.join(" + ")}`);
  } else {
    console.log(`${N} is NOT perfect.`);
  }
}
