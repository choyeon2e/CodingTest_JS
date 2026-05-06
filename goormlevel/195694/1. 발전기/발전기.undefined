  const queue = [[startR, startC]];
  visited[startR][startC] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
        if (board[nr][nc] === 1 && !visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  }
}

function solve(N, board) {
  let count = 0;
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 1 && !visited[i][j]) {
        bfs(i, j, visited, board, N);
        count++;
      }
    }
  }
  return count;
}

rl.on("close", () => {
  if (N > 0) {
    const result = solve(N, matrix);
    console.log(result);
  }
  process.exit();
});
