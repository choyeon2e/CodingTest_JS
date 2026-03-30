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

/**
 *
 * @param {number} i 지금 인덱스
 * @param {number} sum 지금까지 선택 문제의 난이도 합
 * @param {number} min 선택 문제 중 제일 쉬운 문제 난이도
 * @param {number} max 선택 문제 중 제일 어려운 문제 난이도
 * @param {number} num 선택한 문제 수
 * @returns
 */
function checkProblem(i, sum, min, max, num) {
  if (sum > R) return;

  if (i === N) {
    // 조건 체크
    if (num >= 2 && sum >= L && max - min >= X) {
      count++;
    }
    return;
  }

  const nextMin = num === 0 ? levels[i] : Math.min(min, levels[i]);
  const nextMax = num === 0 ? levels[i] : Math.max(max, levels[i]);

  //현재 문제 선택시
  checkProblem(i + 1, sum + levels[i], nextMin, nextMax, num + 1);

  //현재 문제 선택 x시
  checkProblem(i + 1, sum, min, max, num);
}

checkProblem(0, 0, 0, 0, 0);
console.log(count);
