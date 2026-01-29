"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [N, M] = input[line++].split(" ").map(Number);
const priceArr = input.slice(line).map((row) => row.split(" ").map(Number));

let minPack = 1001;
let minSingle = 1001;
/**
 * 반복문을 돌면서 가장 돈 적게 쓰는 경우를 판단
 * 1. 6개 묶음으로 N개 이상
 * 2. 6개 묶음 + 낱개로 N개 이상
 * 3. 낱개로 N개 이상
 */
for (const [pack, single] of priceArr) {
  if (pack < minPack) minPack = pack;
  if (single < minSingle) minSingle = single;
}

let result = 0;

if (minPack > minSingle * 6) {
  result = N * minSingle;
} else {
  result = Math.floor(N / 6) * minPack;
  const remaining = N % 6;
  result += Math.min(remaining * minSingle, minPack);
}
console.log(result);
