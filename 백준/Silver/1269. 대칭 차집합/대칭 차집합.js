"use strict";

const { captureRejectionSymbol } = require("events");
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [A, B] = input[0].split(" ").map(Number);
const setA = new Set(input[1].split(" ").map(Number));
const setB = new Set(input[2].split(" ").map(Number));

/**
 * (A-B)와 (B-A)의 합집합: A와 B의 대칭 차집합
 * = A와 B 크기 더하고 교집합 크기 2배 빼면 됨
 */

let size = 0;

//교집합 크기 구하기
for (const a of setA) {
  if (setB.has(a)) {
    size++;
  }
}

console.log(A + B - 2 * size);
