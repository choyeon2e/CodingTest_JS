const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, V] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

//그래프
for (let i = 1; i <= M; i++) {
  const [start, end] = input[i].split(" ").map(Number);
  graph[start].push(end);
  graph[end].push(start);
}

//정렬
graph.forEach((list) => list.sort((a, b) => a - b));

//DFS
const dfsResult = [];
const dfsVisited = Array(N + 1).fill(false);

function dfs(node) {
  if (dfsVisited[node]) return;

  dfsVisited[node] = true;
  dfsResult.push(node);

  for (const n of graph[node]) {
    dfs(n);
  }
}

//BFS
const bfsResult = [];
const bfsVisited = Array(N + 1).fill(false);

function bfs(startNode) {
  const queue = [startNode];
  bfsVisited[startNode] = true;

  while (queue.length > 0) {
    const node = queue.shift();
    bfsResult.push(node);

    for (const n of graph[node]) {
      if (!bfsVisited[n]) {
        bfsVisited[n] = true;
        queue.push(n);
      }
    }
  }
}

dfs(V);
bfs(V);

console.log(dfsResult.join(" "));
console.log(bfsResult.join(" "));
