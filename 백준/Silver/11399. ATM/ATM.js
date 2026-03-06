"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * ATM 앞에 N명의 사람
 * 1~N번 번호 매겨짐
 * i번 사람이 돈을 인출하는데 걸리는 시간: P[i]분
 *
 * 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값 = ?
 */

const N = +input[0];
const P = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let sum = 0;
let current = 0;

for (let i = 0; i < N; i++) {
  current += P[i];
  sum += current;
}

console.log(sum);
