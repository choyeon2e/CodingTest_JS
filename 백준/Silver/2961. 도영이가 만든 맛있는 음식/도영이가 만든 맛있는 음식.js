"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const ingredients = [];

for (let i = 1; i <= N; i++) {
  ingredients.push(input[i].split(" ").map(Number));
}

/**
 * 신맛 S, 쓴맛 B
 * 신맛 = 사용한 재료의 신맛의 곱
 * 쓴맛 = "의 합
 *
 * 신맛과 쓴맛의 차이가 가장 작은 요리의 차 = ?
 */

let answer = Infinity;

for (let i = 1; i < 1 << N; i++) {
  let sour = 1; // 신맛은 곱셈 => 1로 시작
  let bitter = 0; // 쓴맛은 덧셈 => 0으로 시작

  for (let j = 0; j < N; j++) {
    // i의 j번째 비트 1인지 확인
    if (i & (1 << j)) {
      sour *= ingredients[j][0];
      bitter += ingredients[j][1];
    }
  }

  const diff = Math.abs(sour - bitter);
  if (diff < answer) {
    answer = diff;
  }
}

console.log(answer);
