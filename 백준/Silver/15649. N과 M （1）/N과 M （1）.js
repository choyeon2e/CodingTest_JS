"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

/**
 * 1~N까지 자연수 중에서 중복없이 M개를 고른 수열을 모두 구하기
 *
 * - 중복되는 수열을 여러번 출력하지않기
 * - 각 수열은 공백으로 구분해서 출력
 * - 사전 순으로 증가하는 순서로 출력 (=오름차순)
 *
 * 백트래킹?
 * 반복문으로 맨첫번째부터 돌리기 (1~N)
 *
 */

const visited = new Array(N + 1).fill(false);
const arr = [];
let result = "";

function makeMArr(count) {
  if (count === M) {
    result += arr.join(" ") + "\n";
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      arr.push(i);
      makeMArr(count + 1);
      arr.pop();
      visited[i] = false;
    }
  }
}

makeMArr(0);
console.log(result);
