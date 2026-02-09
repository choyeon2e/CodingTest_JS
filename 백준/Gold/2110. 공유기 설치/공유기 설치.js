"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const houses = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b); //집 좌표 정렬

let low = 1; //최소 거리
let high = houses[N - 1] - houses[0]; //최대 거리
let answer = 0;

while (low <= high) {
  let mid = Math.floor((low + high) / 2);

  let count = 1; //첫 번째 집 무조건 설치
  let lastInstalled = houses[0];

  //mid 간격으로 설치했을 때 몇개 설치 가능한지 확인
  for (let i = 1; i < N; i++) {
    if (houses[i] - lastInstalled >= mid) {
      count++;
      lastInstalled = houses[i];
    }
  }

  if (count >= C) {
    // C개 이상 설치 가능하면, 최댓값 찾기
    answer = mid;
    low = mid + 1;
  } else {
    // C개를 못 채우면
    high = mid - 1;
  }
}

console.log(answer);
