"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [M, N] = input[line++].split(" ").map(Number);
const tomato = input
  .slice(line, line + N)
  .map((row) => row.split(" ").map(Number));

// console.log(M, N, tomato);

let queue = [];
let unripened = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (tomato[i][j] === 1) {
      //익었다면
      queue.push([i, j, 0]); //행,열,현재 날짜
    } else if (tomato[i][j] === 0) {
      unripened++;
    }
  }
}

//상하좌우
const dy = [-1, 1, 0, 0]; //row (행)
const dx = [0, 0, -1, 1]; //column(열)

let head = 0;
let resultDay = 0;

if (unripened === 0) {
  console.log(0);
} else {
  while (head < queue.length) {
    const [y, x, days] = queue[head++];
    resultDay = days;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny >= 0 && ny < N && nx >= 0 && nx < M && tomato[ny][nx] === 0) {
        tomato[ny][nx] = 1;
        unripened--;
        queue.push([ny, nx, days + 1]);
      }
    }
  }

  console.log(unripened === 0 ? resultDay : -1);
}
