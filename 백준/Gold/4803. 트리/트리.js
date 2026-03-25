"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
let caseNum = 1;

while (true) {
  const [n, m] = input[line++].split(" ").map(Number);
  if (n === 0 && m === 0) break;

  //인접리스트
  const adj = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < m; i++) {
    const [u, v] = input[line++].split(" ").map(Number);
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Array(n + 1).fill(false);
  let treeCount = 0;
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      if (isTree(i, 0, adj, visited)) {
        treeCount++; //트리면 treeCount 카운트 증가
      }
    }
  }

  //출력
  let result = `Case ${caseNum}: `;
  if (treeCount === 0) result += "No trees.";
  else if (treeCount === 1) result += "There is one tree.";
  else result += `A forest of ${treeCount} trees.`;
  console.log(result);

  caseNum++;
}

function isTree(curr, prev, adj, visited) {
  visited[curr] = true;
  let isTreeCheck = true; //사이클이 아니면 트리이므로 true

  for (const next of adj[curr]) {
    if (!visited[next]) {
      if (!isTree(next, curr, adj, visited)) isTreeCheck = false;
    } else if (next !== prev) {
      //이미 방문했는데 부모가 부른게 아닐 경우 => 사이클
      isTreeCheck = false;
    }
  }
  return isTreeCheck;
}
