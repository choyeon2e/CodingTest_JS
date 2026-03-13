"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ");

const A = BigInt(input[0]);
const B = BigInt(input[1]);
let count = 0;

const isPrime = new Array(10000000 + 1).fill(1);
isPrime[0] = isPrime[1] = 0;

for (let i = 2; i * i <= 10000000; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= 10000000; j += i) {
      isPrime[j] = 0;
    }
  }
}

for (let i = 2; i <= 10000000; i++) {
  if (isPrime[i]) {
    let p = BigInt(i);
    let temp = p * p;

    while (temp <= B) {
      if (temp >= A) count++;
      if (temp > B / p) break;
      temp *= p;
    }
  }
}

console.log(count);
