"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const cardArr = input[1].split(" ").map(Number); 

const M = +input[2];
const mArr = input[3].split(" ").map(Number);

const cardMap = new Map();

for (let i = 0; i < N; i++) {
  const card = cardArr[i];
  // 이미 카드가 있다면 기존 값에 +1, 없으면 1 저장
  cardMap.set(card, (cardMap.get(card) || 0) + 1);
}

const result = mArr.map(num => cardMap.get(num) || 0);

console.log(result.join(" "));