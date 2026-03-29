"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

/**
 * N개 정수로 이뤄진 수열
 * 크기가 양수인 부분수열 중 그 수열의 원소를 다 더한값이 S가 되는 경우의 수 구하기
 * => 합이 S가 되는 부분수열의 개수 = ?
 *
 * solve)
 * 원소를 1개부터 N개까지 더하면서 현재 합이 S가 되면 return
 * 필요한 props => 인덱스, 현재 합
 * 부분수열 만들 떄 => 현재 인덱스값을 현재 합에 더할 수도 있고 안더하고 넘어갈 수 있음
 */

let result = 0;

function findS(i, sum) {
  if (i === N) {
    if (sum === S) {
      result++;
    }
    return;
  }
  findS(i + 1, sum + arr[i]);
  findS(i + 1, sum);
}

findS(0, 0);
if (S === 0) result--; //공집합
console.log(result);
