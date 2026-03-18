"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = +input[0];
const nArr = [];
for (let i = 1; i <= T; i++) {
  nArr.push(+input[i]);
}

for (let n of nArr) {
  const result = [];

  while (true) {
    if (isPrime(n)) {
      result.push(n);
      n++;
      break;
    }
    n++;
  }

  console.log(result.join("\n"));
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
