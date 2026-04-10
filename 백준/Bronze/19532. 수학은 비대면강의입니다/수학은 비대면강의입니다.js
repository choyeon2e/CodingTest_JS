"use strict";

const fs = require("fs");
const { inflate } = require("zlib");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [a, b, c, d, e, f] = input[0].split(" ").map(Number);

/**
 * ax+by=c, dx+ey=f 연립방정식 풀기
 * (x,y) 구하기
 */

let [x, y] = [0, 0];

for (let i = -999; i <= 999; i++) {
  for (let j = -999; j <= 999; j++) {
    if (a * i + b * j === c && d * i + e * j === f) {
      [x, y] = [i, j];
      console.log(`${x} ${y}`);
      process.exit();
    }
  }
}
