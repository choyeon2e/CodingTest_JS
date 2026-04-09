"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//f(n) = a1*n + a0
const [a1, a0] = input[0].split(" ").map(Number);
const c = Number(input[1]);
const n0 = Number(input[2]);

/**
 * f(n) <= c * g(n) 가 모든 n >= n0 에 대해 성립해야 함
 * 1. a1 * n0 + a0 <= c * n0 (시작점에서 성립하는가?)
 * 2. a1 <= c (기울기 조건: n이 커져도 f(n)이 c*n을 추월하지 않는가?)
 */

if (a1 * n0 + a0 <= c * n0 && a1 <= c) {
  console.log(1);
} else {
  console.log(0);
}
