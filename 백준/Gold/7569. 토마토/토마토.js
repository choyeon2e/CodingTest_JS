"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [M, N, H] = input[line++].split(" ").map(Number);
const tomato = [];

for (let i = 0; i < H; i++) {
  const tomatoArr = input
    .slice(line, line + N)
    .map((row) => row.trim().split(" ").map(Number));

  line += N;
  tomato.push(tomatoArr);
}

//console.log(tomato);

const queue = [];
let unrippened = 0; //안익은 토마토 개수

for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    for (let h = 0; h < M; h++) {
      if (tomato[i][j][h] === 1) {
        queue.push([i, j, h, 0]);
      } else if (tomato[i][j][h] === 0) {
        unrippened++;
      }
    }
  }
}

// 상하좌우위아래
const dz = [0, 0, 0, 0, 1, -1];
const dy = [-1, 1, 0, 0, 0, 0];
const dx = [0, 0, -1, 1, 0, 0];

let head = 0;
let resultDays = 0;

if (unrippened === 0) {
  console.log(0);
} else {
  while (head < queue.length) {
    const [z, y, x, days] = queue[head++];
    resultDays = days;

    for (let i = 0; i < 6; i++) {
      const nz = z + dz[i];
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (nz >= 0 && nz < H && ny >= 0 && ny < N && nx >= 0 && nx < M) {
        if (tomato[nz][ny][nx] === 0) {
          tomato[nz][ny][nx] = 1;
          unrippened--;
          queue.push([nz, ny, nx, days + 1]);
        }
      }
    }
  }
  console.log(unrippened === 0 ? resultDays : -1);
}
