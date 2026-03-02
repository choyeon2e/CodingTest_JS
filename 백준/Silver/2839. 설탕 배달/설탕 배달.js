"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input[0];

const dp = new Array(n + 1).fill(Infinity);

dp[3] = 1;
if (n >= 5) dp[5] = 1;

for (let i = 6; i <= n; i++) {
  //ikg을 만드는 방법: (i-3)kg에서 3kg 하나 추가 vs (i-5)kg에서 5kg 하나 추가
  //둘중 더 작은 봉지 개수를 가진 것을 선택
  dp[i] = Math.min(dp[i - 3], dp[i - 5]) + 1;
}

console.log(dp[n] === Infinity ? -1 : dp[n]);
