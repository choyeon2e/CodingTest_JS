"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [N, M] = input[line++].split(" ").map(Number);
const maze = input.slice(line).map((row) => row.split("").map(Number));

//상,하,좌,우
const dc = [-1, 1, 0, 0]; //column
const dr = [0, 0, -1, 1]; //row

function BFS(startR, startC) {
  const queue = [[startR, startC]];
  const visited = Array.from(Array(N), () => Array(M).fill(0));
  visited[startR][startC] = 1;

  while (queue.length) {
    const [r, c] = queue.shift();
    if (r === N - 1 && c === M - 1) {
      return visited[r][c];
    }

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr >= 0 && nr < N && nc >= 0 && nc < M) {
        if (maze[nr][nc] === 1 && visited[nr][nc] === 0) {
          visited[nr][nc] = visited[r][c] + 1;
          queue.push([nr, nc]);
        }
      }
    }
  }
}
console.log(BFS(0, 0));
