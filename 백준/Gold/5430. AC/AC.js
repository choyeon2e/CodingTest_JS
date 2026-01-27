"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const T = +input[line++];

for (let i = 0; i < T; i++) {
  const p = input[line++].trim();
  const n = +input[line++];
  const xArr = input[line++].trim();

  // 배열 파싱
  let x = n === 0 ? [] : xArr.slice(1, -1).split(",");
  Solve(p, n, x);
}

function Solve(P, N, X) {
  let left = 0;
  let right = N - 1;
  let isR = false;
  let isError = false;

  for (let i = 0; i < P.length; i++) {
    if (P[i] === "R") {
      isR = !isR;
    } else if (P[i] === "D") {
      if (left > right) {
        //더 지울게 없음
        isError = true;
        break;
      }

      if (isR) {
        //만약 R이 실행되어 뒤집혔으면
        right--;
      } else {
        left++;
      }
    }
  }
  if (isError) {
    console.log("error");
  } else {
    let result = X.slice(left, right + 1);
    if (isR) result.reverse();
    console.log(`[${result.join(",")}]`);
  }
}
