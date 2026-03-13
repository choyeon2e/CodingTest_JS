"use strict";

const fs = require("fs");
const N = Number(
  fs
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim(),
);

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function isPalindrome(num) {
  const str = String(num);
  const len = str.length;

  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) return false;
  }
  return true;
}

let current = N;
while (true) {
  if (isPalindrome(current) && isPrime(current)) {
    console.log(current);
    break;
  }
  current++;
}
