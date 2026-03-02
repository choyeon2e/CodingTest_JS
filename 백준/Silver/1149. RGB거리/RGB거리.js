"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const RGB = [];

for (let i = 1; i <= N; i++) {
  RGB.push(input[i].split(" ").map(Number));
}

/**
 * 1번집의 색은 2번집의 색과 달라야함
 * N번집의 색은 N-1번집의 색과 달라야함
 * i번집의 색은 i-1, i+1번 집의 색과 달라야함
 * => 이웃한 집은 같은 색으로 칠할 수 없다
 * => 만약 2번집을 빨강으로 칠하면 1번집은 초록이나 파랑이어야함
 * i번째를 빨강으로 끝내는 최소비용 = 현재의 빨강비용 + 앞집이 초록이나 파랑인 경우에서 비용이 더 적은 것
 *
 * 모든 집을 칠하는 비용의 최솟값 = ??
 */

const dp = Array.from({ length: N }, () => Array(3).fill(0));

//첫번째집 칠하는 비용으로 초기화
dp[0][0] = RGB[0][0];
dp[0][1] = RGB[0][1];
dp[0][2] = RGB[0][2];

for (let i = 1; i < N; i++) {
  // 현재 집을 빨강(0)으로 칠하려면, 앞집은 초록(1)이나 파랑(2) 중 최솟값이어야 함
  dp[i][0] = RGB[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);

  // 현재 집을 초록(1)으로 칠하려면, 앞집은 빨강(0)이나 파랑(2) 중 최솟값이어야 함
  dp[i][1] = RGB[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);

  // 현재 집을 파랑(2)으로 칠하려면, 앞집은 빨강(0)이나 초록(1) 중 최솟값이어야 함
  dp[i][2] = RGB[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
}

console.log(Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]));
