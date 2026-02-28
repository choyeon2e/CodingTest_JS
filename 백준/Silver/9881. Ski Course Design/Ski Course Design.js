"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 목표: 가장 높은 언덕과 가장 낮은 언덕의 차이가 최대 17이 되게 언덕들의 높이 조정
 * 이때 드는 최소비용 = ?
 * 어떤 언덕의 높이를 x만큼 변경할 때 드는 비용: x^2
 * 모든 언덕 높이는 정수로만 변경 가능
 * 입력: 1번째 줄에는 정수 N, 2번째 줄부터 N+1번째 줄까지는 각 언덕의 높이
 * 1<=N<=1000, 0<=height<=100
 */

const N = Number(input[0]);
const hArr = input.slice(1, N + 1).map(Number);

let minCost = Infinity;

for (let low = 0; low <= 83; low++) {
  let currentCost = 0;
  const high = low + 17; //가능한 최대높이: low+17

  for (let i = 0; i < N; i++) {
    const height = hArr[i];
    if (height < low) {
      currentCost += (low - height) ** 2;
    } else if (height > high) {
      currentCost += (height - high) ** 2;
    }
  }
  minCost = Math.min(minCost, currentCost);
}

console.log(minCost);
