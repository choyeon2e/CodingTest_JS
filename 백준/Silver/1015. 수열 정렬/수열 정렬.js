"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * B[P[0]]=A[0]=2
 * B[P[1]]=A[1]=3
 * B[P[2]]=A[2]=1
 *
 * B[1]=2
 * B[2]=3
 * B[0]=1
 *
 **/

let line = 0;
const N = +input[line++];
let A = input[line].split(" ").map(Number);

const mappedA = A.map((value, index) => ({
  value,
  originalIndex: index,
}));

mappedA.sort((a, b) => {
  if (a.value !== b.value) {
    return a.value - b.value;
  }
  return a.originalIndex - b.originalIndex;
});

const P = new Array(N);

mappedA.forEach((item, sortedIndex) => {
  P[item.originalIndex] = sortedIndex;
});
console.log(P.join(" "));
