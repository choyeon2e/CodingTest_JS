"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const numbers = input[1].split(" ").map(Number);
const operators = input[2].split(" ").map(Number);

let max = -Infinity;
let min = Infinity;

/**
 * @param {number} index - 현재 계산에 사용할 숫자의 인덱스
 * @param {number} current - 현재까지 결과값
 */
function calculateResult(index, current) {
  if (index === N) {
    max = Math.max(max, current);
    min = Math.min(min, current);
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (operators[i] > 0) {
      operators[i]--;

      let next;

      if (i === 0) next = current + numbers[index];
      else if (i === 1) next = current - numbers[index];
      else if (i === 2) next = current * numbers[index];
      else {
        next = Math.trunc(current / numbers[index]);  //소수점 이하 버리기
      }
      calculateResult(index + 1, next);
      operators[i]++;
    }
  }
}

calculateResult(1, numbers[0]);

console.log(max === 0 ? 0 :max);
console.log(min === 0 ? 0 : min);
