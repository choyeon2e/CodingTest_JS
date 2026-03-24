"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const arr = [];
let result = "";

/**
 *
 * @param {number} count 현재까지 개수
 * @param {number} start 반복문 시작할 숫자
 *
 */
function makeArr(count, start) {
  if (count === M) {
    result += arr.join(" ") + "\n";
    return;
  }

  for (let i = start; i <= N; i++) {
    arr.push(i);
    makeArr(count + 1, i);
    arr.pop();
  }
}

makeArr(0, 1);
console.log(result);
