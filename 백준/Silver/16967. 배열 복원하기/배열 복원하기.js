"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * A 배열: 크기가 H x W
 * 정수 X, Y
 *
 * B 베열: 크기가 (H+X) * (W+Y)
 * => 배열 A와 배열 A를 아래로 X칸, 오른쪽으로 Y칸 이동시킨 배열을 겹쳐 만들 수 있음
 * 수가 겹쳐지면 수가 합쳐짐
 *
 * 1. (i,j)가 두 배열 모두에 포함 x: B[i][j]=0
 * 2. (i,j)가 두 배열 모두에 포함: B[i][j] = A[i][j] + A[i-X][j-Y]
 * 3. (i,j)가 두 배열 중 하나에 포함: B[i][j] = A[i][j] || A[i-X][j-Y]
 *
 * 만약 i<X, j<Y인 곳은 B[i][j]가 곧 A[i][j]와 동일한 것 (안겹치는 구간이니깐)
 * 2에서 식을 정리하면 A[i][j] = B[i][j] - A[i-X][j-Y]인데
 * A[i-X][j-Y]=B[i-X][j-Y]이므로 결국 B[i][j] = B[i][j] - B[i-X][j-Y]가 됨
 */

let line = 0;
const [H, W, X, Y] = input[line++].split(" ").map(Number);
const B = [];

for (let i = 1; i <= H + X; i++) {
  B.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (i >= X && j >= Y) {
      B[i][j] -= B[i - X][j - Y];
    }
  }
}

for (let i = 0; i < H; i++) {
  console.log(B[i].slice(0, W).join(" "));
}
