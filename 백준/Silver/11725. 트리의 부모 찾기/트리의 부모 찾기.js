"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const N = +input[line++];

const adj = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < N - 1; i++) {
  const [u, v] = input[line++].split(" ").map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

const visited = new Array(N + 1).fill(false);
const parents = new Array(N + 1).fill(0);
const queue = [1]; //루트
visited[1] = true; //1 방문했으므로

let head = 0;
while (head < queue.length) {
  const current = queue[head++];

  for (const next of adj[current]) {
    if (!visited[next]) {
      visited[next] = true;
      parents[next] = current;
      queue.push(next);
    }
  }
}

console.log(parents.slice(2).join("\n"));
