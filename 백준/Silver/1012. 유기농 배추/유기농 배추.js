"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const T = +input[line++];

// 상하좌우
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

function Dfs(y, x, N, M, matrix, visited) {
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
      if (matrix[ny][nx] === 1 && !visited[ny][nx]) {
        Dfs(ny, nx, N, M, matrix, visited);
      }
    }
  }
}

for (let t = 0; t < T; t++) {
  const [M, N, K] = input[line++].split(" ").map(Number);
  const cabbagePositions = input
    .slice(line, line + K)
    .map((row) => row.split(" ").map(Number));
  line += K;

  const matrix = Array.from({ length: N }, () => new Array(M).fill(0));
  const visited = Array.from({ length: N }, () => new Array(M).fill(false));

  cabbagePositions.forEach(([x, y]) => {
    matrix[y][x] = 1;
  });

  let count = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (matrix[y][x] === 1 && !visited[y][x]) {
        Dfs(y, x, N, M, matrix, visited);
        count++;
      }
    }
  }
  console.log(count);
}
