"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const V = Number(input[0]);
/**
 * 트리의 지름: 임의의 두점 사이 거리 중 가장 긴 것
 */
const tree = Array.from({ length: V + 1 }, () => []);

for (let i = 1; i <= V; i++) {
  const line = input[i].split(" ").map(Number);
  const u = line[0];
  for (let j = 1; j < line.length - 1; j += 2) {
    const v = line[j];
    if (v === -1) break;
    const dist = line[j + 1];
    tree[u].push([v, dist]);
  }
}

let max = 0;
const visited = new Array(V + 1).fill(false);

function dfs(node) {
  visited[node] = true;

  let max1 = 0;
  let max2 = 0;

  for (const [n, w] of tree[node]) {
    if (!visited[n]) {
      const result = dfs(n) + w;

      if (result > max1) {
        max2 = max1;
        max1 = result;
      } else if (result > max2) {
        max2 = result;
      }
    }
  }

  max = Math.max(max, max1 + max2);

  return max1;
}

dfs(1);
console.log(max);
