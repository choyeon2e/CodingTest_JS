const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const computerNum = +input[0];
const connectNum = +input[1];

// 인접 리스트 만들기 (컴퓨터 번호가 1번부터 시작하므로 크기를 +1)
const adj = Array.from({ length: computerNum + 1 }, () => []);

for (let i = 2; i < 2 + connectNum; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  adj[a].push(b);
  adj[b].push(a); // 양방향 연결
}

const visited = new Array(computerNum + 1).fill(false);
let count = 0;

function dfs(v) {
  visited[v] = true; //현재 컴퓨터에 true로 방문 처리

  for (const next of adj[v]) {
    if (!visited[next]) {
      count++;
      dfs(next);
    }
  }
}

dfs(1);
console.log(count);
