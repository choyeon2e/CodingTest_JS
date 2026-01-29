"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const [N, M] = input[line++].split(" ").map(Number);
const edges = input
  .slice(line, line + M)
  .map((row) => row.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (const [u, v] of edges) {
  graph[u].push(v);
  graph[v].push(u);
}

const visited = new Array(N + 1).fill(false);
let count = 0;

function Bfs(startNode) {
  const queue = [startNode];
  visited[startNode] = true;

  while (queue.length) {
    const curr = queue.shift();
    for (const next of graph[curr]) {
      if (!visited[next]) {
        visited[next] = true;
        queue.push(next);
      }
    }
  }
}

for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    count++;
    Bfs(i);
  }
}

console.log(count);
