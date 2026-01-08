const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = +input[0];
let line = 1;

const dy = [-1, 1, 0, 0]; //y축 이동값
const dx = [0, 0, -1, 1]; //x축 이동값

function dfs(y, x, N, M, graph) {
  graph[y][x] = 0; //방문 했으므로
  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];
    if (ny >= 0 && ny < N && nx >= 0 && nx < M && graph[ny][nx] === 1) {
      dfs(ny, nx, N, M, graph);
    }
  }
}

while (T--) {
  const [M, N, K] = input[line].split(" ").map(Number);
  const graph = Array.from({ length: N }, () => Array(M).fill(0));
  for (let i = 1; i <= K; i++) {
    const [x, y] = input[line + i].split(" ").map(Number);
    graph[y][x] = 1; //배추 있는 위치
  }
  let worm = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 1) {
        dfs(i, j, N, M, graph);
        worm++;
      }
    }
  }
  console.log(worm);
  line += K + 1;
}
