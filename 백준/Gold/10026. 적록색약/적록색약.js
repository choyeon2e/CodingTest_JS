"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const N = +input[line++];
const colors = input.slice(line).map((row) => row.trim().split(""));

/**
 * 크기가 NxN인 그리드
 * R,G,B 중 하나의 색이 있음 각 칸에
 * 구역은 같은 색으로 이루어짐
 * 같은 색상이 상하좌우 인접 시 두 글자는 같은 구역
 *
 */
let visited = Array.from(Array(N), () => Array(N).fill(false));

function dfs(y, x, color, grid) {
  visited[y][x] = true;

  //상,하,좌,우
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny >= 0 && ny < N && nx >= 0 && nx < N) {
      if (!visited[ny][nx] && grid[ny][nx] === color) {
        //아직 방문하지 않았고 이동할 칸의 색이 현재 탐색중인 color의 색과 같다면
        dfs(ny, nx, color, grid);
      }
    }
  }
}

let normalColorCount = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      dfs(i, j, colors[i][j], colors);
      normalColorCount++; // DFS가 한 번 끝날 때마다 구역 하나 완성
    }
  }
}

const colorBlindColors = colors.map((row) =>
  row.map((color) => (color === "G" ? "R" : color)),
);

let colorBlindCount = 0;
visited = Array.from(Array(N), () => Array(N).fill(false));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      dfs(i, j, colorBlindColors[i][j], colorBlindColors);
      colorBlindCount++; // DFS가 한 번 끝날 때마다 적록색약 구역 하나 완성
    }
  }
}

console.log(normalColorCount + " " + colorBlindCount);
