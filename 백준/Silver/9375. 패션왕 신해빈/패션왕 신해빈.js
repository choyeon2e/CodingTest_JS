"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = input[0].split(" ").map(Number);

let line = 1;
const result = [];

for (let i = 0; i < T; i++) {
  const n = +input[line++];
  const clothesMap = new Map();

  for (let j = 0; j < n; j++) {
    const [name, type] = input[line++].split(" ");
    clothesMap.set(type, (clothesMap.get(type) || 0) + 1);
  }

  let answer = 1;
  for (let clothes of clothesMap.values()) {
    answer *= clothes + 1; //+ 입지않는 경우
  }

  result.push(answer - 1); //알몸인 경우 1가지 빼기
}

console.log(result.join("\n"));
