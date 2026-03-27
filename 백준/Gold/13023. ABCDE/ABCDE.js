"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const adj = Array.from({ length: N }, () => []);

for (let i = 1; i <= M; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

/**
 * 사람들은 0~N-1번 번호 매겨져있고 일부는 친구관계
 *
 * 조건
 * - A와 B는 친구
 * - B와 C는 친구
 * - C와 D는 친구
 * - D와 E는 친구
 *
 * 위 조건에 맞는 A,B,C,D,E가 존재하면 1, 없으면 0 출력
 *
 * solve)
 * A-B-C-D-E인 관계를 찾는 것
 * 번호가 몇번인지는 중요하지않고 중복되지않는 사람 5명을 일렬로 세우는 것
 * => 깊이가 4 이상인지 확인
 *
 */

const visited = new Array(N).fill(false);

function checkFriends(n, depth) {
  if (depth === 4) return true;
  visited[n] = true;

  for (const friend of adj[n]) {
    if (!visited[friend]) {
      if (checkFriends(friend, depth + 1)) {
        return true; //depth===4 소식을 상위로 전달해야함
      }
    }
  }
  visited[n] = false;
  return false;
}

let check = false;
for (let i = 0; i < N; i++) {
  if (checkFriends(i, 0)) {
    check = true;
    break; //조건만족 경우를 찾았으니 끝내기
  }
}

console.log(check ? 1 : 0);
