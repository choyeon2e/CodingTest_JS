"use strict";

const { captureRejectionSymbol } = require("events");
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const heights = input[1].split(" ").map(Number);

/**
 * 오른쪽 건물이 보이려면
 * : A와 B 잇는 직선 기울기가 A, B 사이 모든 건물들과 A를 잇는 직선 기울기보다 커야함
 *
 * 왼쪽 건물이 보이려면
 * : 위와 반대로 작아야함
 */

let max = 0;

for (let i = 0; i < N; i++) {
  let count = 0;
  let left = Infinity;
  let right = -Infinity;

  //왼쪽
  for (let j = i - 1; j >= 0; j--) {
    const slope = (heights[i] - heights[j]) / (i - j);
    if (j === i - 1 || slope < left) {
      left = slope;
      count++;
    }
  }

  //오른쪽
  for (let j = i + 1; j < N; j++) {
    const slope = (heights[j] - heights[i]) / (j - i);
    if (j === i + 1 || slope > right) {
      right = slope;
      count++;
    }
  }
  max = Math.max(max, count);
}

console.log(max);
