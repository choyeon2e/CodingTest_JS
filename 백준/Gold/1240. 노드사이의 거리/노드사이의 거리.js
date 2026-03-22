"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const adj = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  adj[u].push([v, w]);
  adj[v].push([u, w]);
}

function getDistance(start, target) {
  const queue = [[start, 0]];
  const visited = new Array(N + 1).fill(false);
  visited[start] = true;

  while (queue.length > 0) {
    const [node, dist] = queue.shift();
    if (node === target) {
      return dist;
    }

    for (const [next, weight] of adj[node]) {
      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, dist + weight]);
      }
    }
  }
}

const result = [];

for (let i = N; i < N + M; i++) {
  const [start, target] = input[i].split(" ").map(Number);
  result.push(getDistance(start, target));
}

console.log(result.join("\n"));
