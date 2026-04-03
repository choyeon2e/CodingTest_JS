"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, L] = input[0].split(" ").map(Number);

/**
 * 합이 N이면서 길이가 최소 L인 가장 짧은 연속된 음이 아닌 정수 리스트 구하기
 * 2<=L<=100
 *
 * 리스트의 길이가 100 이하면 연속된 수를 첫째줄에 공백으로 구분해 출력
 * 길이가 100보다 크거나 그런 수열이 없으면 -1 출력
 *
 * solve)
 * 시작 숫자를 x, 수열 길이를 l라고 하면
 * 수열 => [x, x+1, x+2, ..., x+(l-1)]
 * 수열의 합 => N = l * x + (l * (l - 1)) / 2
 * x = (N - (l * (l-1)) / 2) / l
 */

let x = -1;
let l = -1;
const answer = [];

for (let i = L; i <= 100; i++) {
  const sum = (i * (i - 1)) / 2; //등차수열 합 공식
  const n = N - sum; //x 정리 식에서 분자부분에 해당하는 부분

  if (n >= 0 && n % i === 0) {
    x = n / i;
    l = i;
    break;
  }
}

if (x === -1) {
  console.log(-1);
} else {
  for (let i = 0; i < l; i++) {
    answer.push(x + i);
  }
  console.log(answer.join(" "));
}
