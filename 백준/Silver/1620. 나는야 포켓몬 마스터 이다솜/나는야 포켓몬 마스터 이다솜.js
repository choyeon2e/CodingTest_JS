"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const poketmonMap = new Map(); //이름->번호
const poketmonArr = new Array(N + 1); //번호->이름

for (let i = 1; i <= N; i++) {
  const name = input[i].trim();
  poketmonMap.set(name, i);
  poketmonArr[i] = name;
}

const result = [];

for (let i = N + 1; i <= N + M; i++) {
  const query = input[i].trim();
  if (isNaN(query)) {
    //query가 숫자인지 글자인지
    result.push(poketmonMap.get(query)); //글자면
  } else {
    result.push(poketmonArr[+query]); //숫자면
  }
}

console.log(result.join("\n"));
