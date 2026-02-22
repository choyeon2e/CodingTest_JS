"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const A = input[1].split(" ").map(Number).sort((a, b) => a - b);

let count = 0;

for (let i = 0; i < N; i++) {
  const target = A[i];
  let left = 0;
  let right = N - 1;

  while (left < right) {
    // 자기 자신은 합의 요소가 될 수 X -> 넘어가기
    if (left === i) {
      left++;
      continue;
    }
    if (right === i) {
      right--;
      continue;
    }

    const sum = A[left] + A[right];

    if (sum === target) {
      count++;
      break; // 좋은 수 -> 다음
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
}

console.log(count);