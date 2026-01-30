"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const N = +input[line++];
const mapArr = input
  .slice(line, line + N)
  .map((row) => row.split("").map(Number));
//console.log(N, mapArr);

/**
 * DFS 풀이
 */

const visited = Array.from({ length: N }, () => new Array(N).fill(false));
//console.log(visited);

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

let count = 0; //현재 단지의 집 개수를 셀 변수

function Dfs(node) {
  const [y, x] = node;
  visited[y][x] = true;
  count++;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny >= 0 && ny < N && nx >= 0 && nx <= N) {
      if (mapArr[ny][nx] === 1 && !visited[ny][nx]) {
        Dfs([ny, nx]);
      }
    }
  }
}

const complexes = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (mapArr[i][j] === 1 && !visited[i][j]) {
      count = 0;
      Dfs([i, j]);
      complexes.push(count);
    }
  }
}

console.log(complexes.length); //총 단지의 수
complexes.sort((a, b) => a - b).forEach((c) => console.log(c));
