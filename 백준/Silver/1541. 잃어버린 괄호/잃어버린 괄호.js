"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const groups = input.split("-");

let result = 0;

for (let i = 0; i < groups.length; i++) {
  const num = groups[i].split("+");
  let sum = 0;
  for (let j = 0; j < num.length; j++) {
    sum += Number(num[j]);
  }

  if (i === 0) {
    result += sum;
  } else {
    result -= sum;
  }
}

console.log(result);
