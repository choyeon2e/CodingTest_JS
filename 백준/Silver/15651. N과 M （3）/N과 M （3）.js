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
 *
 */
function makeArr(count) {
  if (count === M) {
    result += arr.join(" ") + "\n";
    return;
  }

  for (let i = 1; i <= N; i++) {
    arr.push(i);
    makeArr(count + 1);
    arr.pop();
  }
}

makeArr(0);
console.log(result);
