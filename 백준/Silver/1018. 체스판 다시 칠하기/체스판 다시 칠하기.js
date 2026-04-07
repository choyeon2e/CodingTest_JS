"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((line) => line.trim().split(""));

let answer = 64; //8x8

for (let i = 0; i <= N - 8; i++) {
  for (let j = 0; j <= M - 8; j++) {
    let count = 0; //W로 시작하는 체스판과 비교 => 틀린 개수

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const current = board[i + r][j + c];

        if ((r + c) % 2 === 0) {
          if (current !== "W") count++; //r+c 짝수면 시작점이랑 같은 색
        } else {
          if (current !== "B") count++; //홀수면 다른 색
        }
      }
    }
    const min = Math.min(count, 64 - count);
    if (min < answer) answer = min;
  }
}

console.log(answer);
