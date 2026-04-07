"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((line) => line.split(" ").map(Number));

const visited = Array.from({ length: N }, () => Array(M).fill(false));
let maxStrength = 0;

// 부메랑 4가지 모양의 날개 좌표 (중심점 기준 상대 좌표)
const shapes = [
  [0, -1, 1, 0],
  [-1, 0, 0, -1],
  [-1, 0, 0, 1],
  [0, 1, 1, 0],
];

function solve(r, c, sum) {
  //열 끝에 가면 다음 행
  if (c === M) {
    solve(r + 1, 0, sum);
    return;
  }

  //모든 행 다 돌면
  if (r === N) {
    maxStrength = Math.max(maxStrength, sum);
    return;
  }

  if (!visited[r][c]) {
    for (let i = 0; i < 4; i++) {
      const [dr1, dc1, dr2, dc2] = shapes[i];
      const nr1 = r + dr1,
        nc1 = c + dc1;
      const nr2 = r + dr2,
        nc2 = c + dc2;

      //부메랑 만들 수 있는 조건 확인
      if (
        nr1 >= 0 &&
        nr1 < N &&
        nc1 >= 0 &&
        nc1 < M &&
        nr2 >= 0 &&
        nr2 < N &&
        nc2 >= 0 &&
        nc2 < M &&
        !visited[nr1][nc1] &&
        !visited[nr2][nc2]
      ) {
        //부메랑 만들기
        visited[r][c] = true;
        visited[nr1][nc1] = true;
        visited[nr2][nc2] = true;

        //중심점은 2배
        const currentStrength =
          board[r][c] * 2 + board[nr1][nc1] + board[nr2][nc2];
        solve(r, c + 1, sum + currentStrength);
        visited[r][c] = false;
        visited[nr1][nc1] = false;
        visited[nr2][nc2] = false;
      }
    }
  }

  //사용하지 않고 그냥 넘어가는 경우
  solve(r, c + 1, sum);
}

if (N < 2 && M < 2) {
  console.log(0);
} else {
  solve(0, 0, 0);
  console.log(maxStrength);
}
