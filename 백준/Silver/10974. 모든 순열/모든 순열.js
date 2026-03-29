"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

/**
 * 1~N까지 수로 이뤄진 순열을 사전순 출력
 * 첫째줄~N!줄에 걸쳐 모든 순열 사전순 출력
 *
 * solve)
 * 순열이니까 한번쓴 숫자는 다시 쓰지않음
 * => visited 배열 사용해야함
 */

const result = [];
const visited = new Array(N + 1).fill(false);
const current = [];

function makeP(num) {
  if (num === N) {
    result.push(current.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      current.push(i);
      makeP(num + 1);
      current.pop();
      visited[i] = false;
    }
  }
}

makeP(0);
console.log(result.join("\n"));
