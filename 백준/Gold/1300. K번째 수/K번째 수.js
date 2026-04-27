"use strict";

const { captureRejectionSymbol } = require("events");
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const K = Number(input[1]);

/**
 * NxN 배열 A, A[i][j] = ixj
 * A를 일차원배열 B에 넣고 정렬했을 때의 B[k] 찾기
 *
 * => 특정 수보다 작거나 같은 숫자 몇개인지 확인하면 됨
 */

let low = 1;
let high = K;
let answer = 0;

while (low <= high) {
  let mid = Math.floor((low + high) / 2);
  let count = 0;

  for (let i = 1; i <= N; i++) {
    count += Math.min(Math.floor(mid / i), N);
  }

  if (count >= K) {
    answer = mid;
    high = mid - 1;
  } else {
    low = mid + 1;
  }
}

console.log(answer);
