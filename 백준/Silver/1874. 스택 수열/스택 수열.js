"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input.slice(1).map(Number);

/**
 * 입력된 수열을 만들기 위해 필요한 연산을 출력
 * 1부터 n까지의 수를 스택에 넣었다가 뽑아 늘어놓음으로써 하나의 수열을 만들 수 있음
 * push는 오름차순대로
 *
 * push: +
 * pop: -
 * 불가능: NO
 */

const stack = [];
const answer = [];
let index = 1;
let canStack = true;

for (let i = 0; i < n; i++) {
  const target = arr[i];

  while (index <= target) {
    stack.push(index);
    answer.push("+");
    index++;
  }

  if (stack[stack.length - 1] === target) {
    stack.pop();
    answer.push("-");
  } else {
    canStack = false;
    break;
  }
}

if (canStack) {
  console.log(answer.join("\n"));
} else {
  console.log("NO");
}
