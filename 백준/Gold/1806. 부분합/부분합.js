"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

/**
 * 길이 N짜리 수열
 * 연속된 수 부분합 중 그 합이 S 이상이고 가장 짧은 것의 길이 = ?
 */

let start = 0;
let end = 0;

let sum = 0;
let min = Infinity;

while (true) {
  if (sum >= S) {
    min = Math.min(min, end - start);
    sum -= arr[start];
    start++;
  } else if (end === N) {
    break;
  } else {
    sum += arr[end];
    end++;
  }
}

console.log(min === Infinity ? 0 : min);
