"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const pos = [];
const neg = [];
let plusOne = 0;

/**
 * 수열의 합을 구하는데 수열의 두 수를 묶어서 구함
 * => 위치에 상관 없이 묶기 가능
 * 같은위치에 있는 수(자기자신)를 묶는 것은 x
 *
 * 묶게되면 묶은 수는 서로 곱한 후에 더함
 * 합이 최대가 되게 하는 프로그램 = ??
 */

for (let i = 1; i <= N; i++) {
  const num = +input[i];
  if (num > 1)
    pos.push(num); //0보다 큰 수
  else if (num <= 0)
    neg.push(num); //0 이하의 수 (0 포함)
  else plusOne++; // 1 (곱하는 것보다 더하는 게 나음)
}

pos.sort((a, b) => b - a); //큰 수부터 정렬
neg.sort((a, b) => a - b); //작은 수부터 정렬 (절대값이 큰 순)

let sum = plusOne;

for (let i = 0; i < pos.length; i += 2) {
  if (i + 1 < pos.length) {
    sum += pos[i] * pos[i + 1];
  } else {
    sum += pos[i];
  }
}

for (let i = 0; i < neg.length; i += 2) {
  if (i + 1 < neg.length) {
    sum += neg[i] * neg[i + 1];
  } else {
    sum += neg[i];
  }
}

console.log(sum);
