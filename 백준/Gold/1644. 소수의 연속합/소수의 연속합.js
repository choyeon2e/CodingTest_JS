"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

/**
 * 자연수가 주어졌을 때, 이 자연수를 연속된 소수의 합으로 나타낼 수 있는 경우의 수 구하기
 */

function returnPrime(num) {
  let isPrime = new Array(num + 1).fill(true);
  let primes = [];

  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= num; j += i) {
        isPrime[j] = false;
      }
    }
  }

  for (let i = 2; i <= num; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

const primeArr = returnPrime(N);
let sum = 0;
let start = 0;
let count = 0;

for (const prime of primeArr) {
  sum += prime;

  while (sum > N) {
    sum -= primeArr[start];
    start++;
  }

  if (sum === N) count++;
}

console.log(count);
