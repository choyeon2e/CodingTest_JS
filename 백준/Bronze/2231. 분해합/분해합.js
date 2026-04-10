"use strict";

const fs = require("fs");
const { inflate } = require("zlib");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
// const num = input[0].split("").map(Number);

/**
 * 분해합: N과 N을 이루는 각 자리수의 합
 * M의 분해합이 N인 경우 => M은 N의 생성자
 * 생성자는 없을 수도 있고 여러개일 수도 있음
 *
 * N의 가장 작은 생성자 = ?
 * => 분해합이 N이 되는 자연수 M을 구하기
 */

let M = 0;

for (let i = 1; i < N; i++) {
  let sum = i;
  let temp = i;

  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }

  if (sum === N) {
    M = i;
    break;
  }
}

console.log(M);
