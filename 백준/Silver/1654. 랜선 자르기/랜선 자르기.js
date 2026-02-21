"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 서로다른 길이의 랜선 K개
 * => 모두 똑같은 길이 L로 잘라서 총 N개 이상의 랜선만들기
 * => 이때 만들 수 있는 최대길이 L을 찾기
 * - 자르고 남은 자투리 랜선은 버림
 * 
 * 로직
 * 1. 자르는 개수 계산: 각 랜선을 mid 길이로 나누었을 때 나오는 몫을 모두 더하기
 * 2. 조건 판단
 *  - 만들어진 개수가 N보다 크거나 같다면: 일단 성공. 근데 더 길게 자를 수 있으니 길이 늘려보기
 *  - 만들어진 개수가 N보다 작다면: 너무 길게 잘라서 개수가 부족한 것. 길이를 줄이기
 */

const [K,N] = input[0].split(" ").map(Number);
const lines = input.slice(1).map(Number);

let low = 1; //최소 1부터 시작 (랜선길이는 0이 안되니까)
let high = Math.max(...lines);
let answer = 0;

while (low<=high){
  let mid=Math.floor((low+high)/2);

  //자르는 개수 계산
  let count =0;
  for (let line of lines){
    count += Math.floor(line/mid);
  }

  //조건 판단
  if (count>=N){
    //N개보다 더 많이 만들 수 있으면 일단 성공(후보)
    // 더 길게 자를 수 있는 지를 확인 (오른쪽 탐색)
    answer = mid;
    low = mid+1;
  } else {
    //개수가 부족하면 길이를 너무 크게 잡은 것
    //길이를 줄여서 다시 탐색 (왼쪽 탐색)
    high = mid-1;
  }
}

console.log(answer);