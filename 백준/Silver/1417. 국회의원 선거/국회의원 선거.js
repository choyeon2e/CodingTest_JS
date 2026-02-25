"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const N = +input[line++];
/**
 * 다솜이는 기호 1번
 * 후보는 N명
 * 다른 모든 사람의 득표수보다 많은 득표 -> 당선
 * => 다른 후보들의 표를 다른 모든 후보들의 득표수보다 많을 정도로 뺏어오면 다솜이 당선
 */
let dasom = +input[line++]; //다솜이 득표수 (기호 1번)
let others = input.slice(line).map(Number);
let count = 0;

if (N === 1) {
  //후보가 1명 (=다솜이 혼자)
  console.log(0);
} else {
  while (true) {
    others.sort((a, b) => b - a);
    if (others[0] >= dasom) {
      //만약 다른 후보들 중 제일 표 많은 사람의 표 >= 다솜이 표
      others[0]--; //표 뺏어오기
      dasom++;
      count++;
    } else {
      break;
    }
  }
  console.log(count);
}
