"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//최대공약수
function getGCD(a, b) {
  while (b !== 0) {
    let r = a % b;
    a = b;
    b = r;
  }
  return a;
}

const t = +input[0];
for (let i = 1; i <= t; i++) {
  const arr = input[i].split(" ").map(Number);

  const n = arr[0];
  const numArr = arr.splice(1);
  let sum = 0;

  for (let j = 0; j < n; j++) {
    for (let k = j + 1; k < n; k++) {
      sum += getGCD(numArr[j], numArr[k]);
    }
  }

  console.log(sum);
}
