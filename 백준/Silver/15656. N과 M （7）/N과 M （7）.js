"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

/**
 * 중복되는 수열 여러번 출력 x
 * 공백으로 구분해서 출력
 * 사전순으로 증가하는 순서로 출력
 * N개의 자연수 중 M개를 고른 수열
 * 같은 수를 여러번 골라도됨!!!
 */

const result = [];
let output = "";

function makeArr(count, start) {
  if (count === M) {
    output += result.join(" ") + "\n";
    return;
  }

  for (let i = 0; i < N; i++) {
    result.push(arr[i]);
    makeArr(count + 1);
    result.pop();
  }
}

makeArr(0);
console.log(output);
