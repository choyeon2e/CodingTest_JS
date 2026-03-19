"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
/**
 * 트리의 루트를 1이라고 했을 때 각 노드의 부모는?
 */

const tree = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
  const [w1, w2] = input[i].split(" ").map(Number);
  tree[w1].push(w2);
  tree[w2].push(w1);
  //부모가 누구인지 모르니까 일단 양방향 그래프로 연결
}

const parent = Array(N + 1).fill(0); //부모

function dfs(node) {
  for (const next of tree[node]) {
    if (parent[next] === 0) {
      parent[next] = node;
      dfs(next);
    }
  }
}

parent[1] = -1; //루트 1이고 루트의 부모는 없음
dfs(1);

let result = "";
for (let i = 2; i <= N; i++) {
  result += parent[i] + "\n";
}

console.log(result.trim());
