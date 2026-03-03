"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const numbers = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const x = +input[2];

/**
 * a[i]+a[j] = x를 만족하는 (a[i],a[j])쌍의 수 = ?
 */

let left = 0;
let right = n - 1;
let count = 0;

while (left < right) {
  const sum = numbers[left] + numbers[right];
  if (sum === x) {
    count++;
    left++;
    right--;
  } else if (sum < x) {
    left++;
  } else {
    right--;
  }
}

console.log(count);
