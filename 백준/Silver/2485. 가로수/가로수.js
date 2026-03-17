"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const treePos = [];

for (let i = 1; i <= N; i++) {
  treePos.push(+input[i]);
}

/**
 * 모든 가로수가 같은 간격이 되도록 새로 심어야하는 가로수의 최소수 = ?
 *
 * => 최소로 심으려면 간격이 최대여야함
 * => 나무들 간격들의 최대공약수
 * 전체 거리/최대공약수 = 전체 나무 개수
 * 전체나무개수 - 지금 심어진나무
 */

function getGCD(a, b) {
  //최대공약수
  while (b !== 0) {
    let r = a % b;
    a = b;
    b = r;
  }
  return a;
}

const treeGap = [];
for (let i = 0; i < N - 1; i++) {
  treeGap.push(treePos[i + 1] - treePos[i]); //나무들 사이 간격
}

let gap = treeGap[0];
for (let i = 0; i < treeGap.length; i++) {
  gap = getGCD(gap, treeGap[i]); //간격들의 최대공약수 gap에 넣기
}

const tree = (treePos[N - 1] - treePos[0]) / gap + 1;
console.log(tree - N);
