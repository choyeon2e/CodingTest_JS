"use strict";

const { captureRejectionSymbol } = require("events");
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
let books = [];

for (let i = 1; i <= N; i++) {
  books.push(input[i]);
}

books.sort();

let bestSeller = books[0];
let max = 1;
let current = 1;

for (let i = 1; i < N; i++) {
  if (books[i] === books[i - 1]) {
    current++;
  } else {
    current = 1;
  }

  if (current > max) {
    max = current;
    bestSeller = books[i];
  }
}

console.log(bestSeller);
