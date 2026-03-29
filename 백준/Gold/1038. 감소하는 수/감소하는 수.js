"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

/**
 * 음이 아닌 정수 X
 * 가장 큰 자릿수부터 작은 자릿수까지 감소하면 X는 감소하는 수
 *
 * ex) 321, 950은 감소하는 수
 *
 * N번째 감소하는 수 출력하기
 *
 * - 0은 0번째 감소하는 수
 * - 1은 1번째 감소하는 수
 * - N번째 감소하는 수가 없다면 -1 출력
 *
 * solve)
 * 감소하는 수 => 왼쪽 숫자가 오른쪽 수보다 무조건 커야함
 * 만약에 N이 너무 커서 감소하는 수 총 개수를 넘으면 -1 출력
 */
const result = [];

/**
 *
 * @param {string} current 지금까지 만든 숫자(연산 위해 string형태)
 * @param {number} lastNum 마지막 숫자
 */
function findDecentNum(current, lastNum) {
  for (let i = 0; i < lastNum; i++) {
    findDecentNum(current + i.toString(), i);
  }
  result.push(Number(current));
}

for (let i = 0; i <= 9; i++) {
  findDecentNum(i.toString(), i);
}

result.sort((a, b) => a - b);

if (N >= result.length) {
  console.log(-1);
} else {
  console.log(result[N]);
}
