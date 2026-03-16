"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

/**
 * 에라토스테네스의 체: N보다 작거나 같은 모든 소수를 찾기
 *
 * 1. 2~N까지 모든 정수 적기
 * 2. 아직 지우지 않은 수 중 가장 작은 수 찾기 => P = 소수
 * 3. P를 지우고 아직 지우지않은 P의 배수를 크기순으로 지우기
 * 4. 아직 모든 수를 지우지 않았으면 2번으로 돌아가기
 *
 * K번째 지우는 수 = ?
 */

const num = new Array(N + 1).fill(false); //지워졌으면 true
let idx = 0;

for (let i = 2; i <= N; i++) {
  if (!num[i]) {
    //소수 P => 왜냐면 이미 4 같은거는 i=2턴에서 지워짐
    for (let j = i; j <= N; j += i) {
      if (!num[j]) {
        num[j] = true;
        idx++;
        if (idx === K) {
          console.log(j);
          return;
        }
      }
    }
  }
}
