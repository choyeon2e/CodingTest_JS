"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [ANum, ADen] = input[0].split(" ").map(Number); //Num = 분자, Den = 분모
const [BNum, BDen] = input[1].split(" ").map(Number);

const den = ADen * BDen;
const num = ADen * BNum + BDen * ANum;

let gcd = 1;
const min = Math.min(num, den);

for (let i = min; i >= 1; i--) {
  if (num % i === 0 && den % i === 0) {
    gcd = i; // 나누어떨어지는 가장 큰 수
    break;
  }
}

console.log(`${num / gcd} ${den / gcd}`);
