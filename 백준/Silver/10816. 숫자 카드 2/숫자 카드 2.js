"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const cardArr = input[1].split(" ").map(Number).sort((a,b)=>a-b);

const M = +input[2];
const mArr = input[3].split(" ").map(Number);

const result= [];

function lowerBound(arr,target){
  let left=0;
  let right = arr.length;
  while (left <right){
    let mid = Math.floor((left+right)/2);
    if (arr[mid]>=target) right=mid;
    else left = mid+1;
  }
  return left;
}

function upperBound(arr,target){
  let left=0;
  let right=arr.length;
  while (left<right){
    let mid = Math.floor((left+right)/2);
    if (arr[mid]>target) right=mid;
    else left = mid+1;
  }
  return left;
}

for (let i=0; i<M; i++){
  const count = upperBound(cardArr, mArr[i]) - lowerBound(cardArr, mArr[i]);
  result.push(count);
}

console.log(result.join(" "));