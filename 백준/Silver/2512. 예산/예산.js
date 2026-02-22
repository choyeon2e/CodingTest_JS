"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");


const N = +input[0];
const budgetArr = input[1].split(" ").map(Number);
const M = +input[2];

function binarySearch(){
  let left=0;
  let right = Math.max(...budgetArr);
  let answer = 0;

  while (left<=right){
    let mid = Math.floor((left+right)/2); //현재 상한액
    let total=0;

    for (let budget of budgetArr){
      if (budget > mid) total += mid;
      else total += budget;
    }

    if (total<=M){
      answer = mid;
      left = mid+1;
    } else {
      right = mid-1;
    }
  }

  return answer;
}

console.log(binarySearch());