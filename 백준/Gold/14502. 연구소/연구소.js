"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const map = [];
let result = 0;

/**
 * 0: 빈칸
 * 1: 벽
 * 2: 바이러스 있음
 * 바이러스는 벽없으면 모든 빈칸으로 퍼지기 가능
 *
 * 벽은 3개 세우기 가능하고 꼭 3개 세워야함
 *
 * =>> 벽 3개 세우고 바이러스 모두 퍼진 뒤 0인 영역의 크기의 최댓값 구하기
 *
 * 벽을 어디에 세울까...
 * 벽 3개를 세우는 모든 경우를 해보고(백트래킹) 
 * 그 각각에서 바이러스 퍼뜨린 뒤 안전구역의 크기 중 가장 큰거 찾기?
 */

for (let i = 1; i <= N; i++) {
  map.push(input[i].split(" ").map(Number));
}

//벽 세우는 함수
function makeWall(count) {
  if (count === 3) {
    spreadVirus();
    return;
  }

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (map[r][c] === 0) {
        //빈칸이면
        map[r][c] = 1; //벽 세우기
        makeWall(count + 1);
        map[r][c] = 0;
      }
    }
  }
}

//바이러스 퍼뜨리는 함수
function spreadVirus() {
  const tempMap = map.map((row) => [...row]);
  const queue = [];

  //상하좌우
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (tempMap[r][c] === 2) queue.push([r, c]);
    }
  }

  //BFS
  let head = 0;
  while (head < queue.length) {
    const [r, c] = queue[head++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr >= 0 && nr < N && nc >= 0 && nc < M) {
        if (tempMap[nr][nc] === 0) {
          tempMap[nr][nc] = 2;
          queue.push([nr, nc]);
        }
      }
    }
  }

  //안전구역 세기
  let safeArea = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (tempMap[r][c] === 0) safeArea++;
    }
  }

  //안전구역의 최대 체크
  result = Math.max(result, safeArea);
}

makeWall(0);
console.log(result);
