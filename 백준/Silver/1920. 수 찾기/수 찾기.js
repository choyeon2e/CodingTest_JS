"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const N = +input[line++];

const A = input[line++]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b); //오름차순 정렬

const M = +input[line++];
// 찾아야 할 타겟 숫자들
const targets = input[line++].split(" ").map(Number);

function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return 1; // 찾음
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return 0; // 못 찾음
}

const result = targets.map((target) => binarySearch(A, target));
console.log(result.join("\n"));
