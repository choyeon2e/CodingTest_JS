"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const Xarr = input[1].split(" ").map(Number);

/**
 * 결국 나보다 작은 숫자가 몇개인지를 구해야하는 문제임
 * 대신 중복을 제거하고 정렬하기 => Set
 * 정렬 후에 Map에 값과 인덱스를 넣기 => 그럼 그 인덱스가 그 수보다 작은 수의 개수니까 답
 */

const sorted = [...new Set(Xarr)].sort((a, b) => a - b);

const map = new Map();
sorted.forEach((v, i) => {
  map.set(v, i);
});

const result = [];
for (let i = 0; i < N; i++) {
  result.push(map.get(Xarr[i]));
}

console.log(result.join(" "));
