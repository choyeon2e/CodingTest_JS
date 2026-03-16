"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = input[0]; //길거리에서 찾은 수
const nArr = N.split("")
  .map(Number)
  .sort((a, b) => b - a);

/**
 * 길거리에서 찾은 수에 포함된 숫자들을 섞어
 * 30의 배수가 되는 가장 큰 수 = ?
 *
 * 30의 배수가 되려면 1의자리는 무조건 0이어야함
 * 1의자리 제외 수는 3의 배수여야함 => 각 자리수의 합이 3의 배수여야함
 */

function isThirty(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  if (sum % 3 === 0) {
    return true;
  } else {
    return false;
  }
}

if (nArr[nArr.length - 1] !== 0) {
  console.log(-1);
  return;
} else {
  console.log(isThirty(nArr) ? nArr.join("") : -1);
}
