"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N,M] = input[0].split(" ").map(Number);
const trees = input[1].split(" ").map(Number);

let low = 0;
let high = Math.max(...trees);
let answer = 0;

while (low<=high){
  let mid = Math.floor((low+high)/2);

  //현재 높이(=mid)로 잘랐을 때 얻는 나무 양
  let sum=0;
  for (let i=0; i<N; i++){
    //절단기(mid)보다 나무가 커야 잘린 윗부분을 가져갈 수 있음
    if (trees[i]>mid){
      sum+= (trees[i]-mid);
    }
  }

  if (sum>=M){
    //나무가 충분하면 높이를 높여서 최대를 찾기
    answer = mid;
    low = mid+1;
  } else {
    //나무가 부족하면 높이를 낮춰서 더 많이 베기
    high = mid-1;
  }
}

console.log(answer);
