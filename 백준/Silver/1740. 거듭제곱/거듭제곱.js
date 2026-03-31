"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = BigInt(input);

/**
 *
 * 서로 다른 3의 거듭제곱의 합으로 수를 만듦
 * N번째로 작은 수 => ?
 *
 * solve)
 * N을 이진수로 변환했을 때 각 비트(1)의 위치를 3의 거듭제곱으로 계산
 */

let binary = N.toString(2);
let result = 0n;
let power = 1n;

for (let i = binary.length - 1; i >= 0; i--) {
  if (binary[i] === "1") {
    result += power;
  }
  power *= 3n;
}

console.log(result.toString());
