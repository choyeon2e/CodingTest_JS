"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = +input;

if (N === 1) {
  console.log(0);
  process.exit();
}

function getPrimes(num) {
  let isPrime = new Array(num + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= num; j += i) {
        isPrime[j] = false;
      }
    }
  }

  let primes = [];
  for (let i = 2; i <= num; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

const primes = getPrimes(N);

let count = 0;
let start = 0;
let end = 0;
let sum = 0;

while (true) {
  if (sum >= N) {
    if (sum === N) count++;
    sum -= primes[start];
    start++;
  } else if (end === primes.length) {
    break;
  } else {
    sum += primes[end];
    end++;
  }
}

console.log(count);
