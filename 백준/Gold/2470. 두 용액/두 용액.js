"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const liquids = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let left = 0;
let right = N - 1;
let sum = Infinity;
let ans = [0, 0];

while (left < right) {
  const currentSum = liquids[left] + liquids[right];
  if (Math.abs(currentSum) < sum) {
    sum = Math.abs(currentSum);
    ans = [liquids[left], liquids[right]];

    if (currentSum === 0) break;
  }

  if (currentSum < 0) {
    left++;
  } else {
    right--;
  }
}

console.log(ans.join(" "));
