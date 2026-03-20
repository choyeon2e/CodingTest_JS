"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const T = Number(input[line++]);

for (let i = 0; i < T; i++) {
  const [N, M] = input[line++].split(" ").map(Number);
  const adjList = Array.from({ length: N + 1 }, () => []);
  for (let j = 0; j < M; j++) {
    const [a, b] = input[line++].split(" ").map(Number);
    adjList[a].push(b);
    adjList[b].push(a);
  }

  const visited = new Array(N + 1).fill(false);
  let airplaneCount = 0;
  const queue = [1];
  visited[1] = true;

  while (queue.length > 0) {
    const current = queue.shift();
    for (const next of adjList[current]) {
      if (!visited[next]) {
        visited[next] = true;
        airplaneCount++;
        queue.push(next);
      }
    }
  }
  console.log(airplaneCount);
}
