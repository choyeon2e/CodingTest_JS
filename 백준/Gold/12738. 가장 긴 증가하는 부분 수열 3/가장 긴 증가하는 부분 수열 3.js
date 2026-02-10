"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const N = +input[line++];
const A = input[line++].split(" ").map(Number);

const arr = [A[0]];

function binarySearch(target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

for (let i = 0; i < N; i++) {
  const current = A[i];
  const len = arr.length;
  if (current > arr[len - 1]) {
    arr.push(current);
  } else {
    const idx = binarySearch(current);
    arr[idx] = current;
  }
}

console.log(arr.length);
