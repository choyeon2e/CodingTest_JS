"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [min, max] = [input[0], input[1]];

/**
 * X라는 정수가 1보다 큰 제곱수로 나누어떨어지지않을때: 제곱ㄴㄴ수
 * (제곱수: 정수의 제곱)
 *
 * min<=X<=max인 X는 몇개?
 *
 * max-min=1,000,000 (백만)
 */

const range = max - min + 1;
const sqNum = new Array(range).fill(true); //제곱ㄴㄴ수이면 true

for (let i = 2; i * i <= max; i++) {
  const square = i * i;
  let minSq = Math.ceil(min / square) * square; //min보다 크거나 같은 square의 가장 작은 배수

  for (let j = minSq; j <= max; j += square) {
    if (sqNum[j - min]) {
      sqNum[j - min] = false;
    }
  }
}

let result = 0;

for (let i = 0; i < range; i++) {
  if (sqNum[i]) result++;
}
console.log(result);
