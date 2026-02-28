"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const cardArr = [];
for (let i = 1; i <= N; i++) {
  cardArr.push(i);
}

function SortCard(arr, n) {
  let front = 0;

  while (arr.length - front > 1) {
    front++;
    if (arr.length - front === 1) {
      break;
    }
    arr.push(arr[front]);
    front++;
  }
  return arr[front];
}

console.log(SortCard(cardArr, N));
