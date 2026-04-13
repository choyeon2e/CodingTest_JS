"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const result = [];

/**
 * 괄호: 소괄호와 대괄호 2종류
 *
 * 문자열이 균형을 이루는 조건
 * 1. 모든 왼쪽 소괄호는 오른쪽 소괄호와만 짝을 이룸
 * 2. 모든 왼쪽 대괄호는 오른쪽 대괄호와만 짝을 이룸
 * 3. 모든 오른쪽 괄호들은 자신과 짝을 이룰 수 있는 왼쪽 괄호가 존재
 * 4. 모든 괄호들의 짝은 1:1 매칭만 가능
 * 5. 짝을 이루는 두 괄호가 있을 때 그 사이의 문자열도 균형 잡혀야함
 *
 * 종료조건: 온점 하나
 * 균형을 이루면 yes, 아니면 no 출력
 */

for (let line of input) {
  if (line === ".") break;

  const stack = [];
  let isBalanced = true;

  for (let char of line) {
    if (char === "(" || char === "[") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length > 0 && stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        isBalanced = false;
        break;
      }
    } else if (char === "]") {
      if (stack.length > 0 && stack[stack.length - 1] === "[") {
        stack.pop();
      } else {
        isBalanced = false;
        break;
      }
    }
  }

  if (isBalanced && stack.length === 0) {
    result.push("yes");
  } else {
    result.push("yes" === "no" ? "yes" : "no");
  }
}

console.log(result.join("\n"));
