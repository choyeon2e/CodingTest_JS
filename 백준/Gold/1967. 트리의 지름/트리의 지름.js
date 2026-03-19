"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 트리의 지름
 * = 트리에 존재하는 모든 경로들 중에 가장 긴 것의 길이
 *
 * 간선에 대한 정보는 세개의 정수로 구성
 * 1. 간선이 연결하는 두 노드 중 부모노드의 번호
 * 2. 자식노드
 * 3. 간선의 가중치
 *
 * 부모노드의 번호가 작은 것이 먼저 입력
 * 부모노드의 번호가 같으면 자식노드의 번호가 작은 것이 먼저 입력
 *
 * 루트의 노드번호는 항상 1, 간선 가중치는 양의 정수 (<=100)
 */

const N = Number(input[0]);
const tree = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
  const [parent, child, weight] = input[i].split(" ").map(Number);
  tree[parent].push([child, weight]);
}

let max = 0;

function dfs(node) {
  let path = [0, 0];

  for (const [c, w] of tree[node]) {
    path.push(dfs(c) + w);
  }

  path.sort((a, b) => b - a);
  max = Math.max(max, path[0] + path[1]);
  return path[0];
}

dfs(1);
console.log(max);
