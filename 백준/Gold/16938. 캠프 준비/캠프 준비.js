"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, L, R, X] = input[0].split(" ").map(Number);
const levels = input[1].split(" ").map(Number);

/**
 * 문제: N개
 * i번째 문제의 난이도는 A[i]
 *
 * - 문제는 두문제 이상이어야함
 * - [L<=문제 난이도의 합<=R] 이어야함
 * - [가장 어려운 문제 난이도 - 가장 쉬운 문제 난이도] >=X 여야함
 *
 * 캠프에 쓸 문제를 고르는 방볍의 수 = ??
 */

let count = 0;

for (let i = 1; i < 1 << N; i++) {
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;
  let num = 0;

  for (let j = 0; j < N; j++) {
    if (i & (1 << j)) {
      const currentLevel = levels[j];
      sum += currentLevel;
      if (currentLevel < min) min = currentLevel;
      if (currentLevel > max) max = currentLevel;
      num++;
    }
  }

  if (num >= 2 && sum >= L && sum <= R && max - min >= X) {
    count++;
  }
}

console.log(count);
