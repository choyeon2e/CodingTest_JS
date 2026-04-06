"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const paper = input.slice(1).map((line) => line.split(" ").map(Number));

/**
 * 각 정사각형들은 하얀색 or 파란색
 * 종이를 일정한 규칙에 따라 잘라서 다양한 크기 가진 정사각형의 하양 or 파랑 색종이 만들기
 *
 * 종이 자르는 규칙
 * - 모두 같은 색 아니면: 가로,세로 중간부분 잘라서 4개의 N/2 x N/2 색종이로 나누기
 * => 나눠진 종이 각각도 다 같은색 아니면 반복해서 나누기 진행
 *
 * ==> 잘라진 종이들이 다 하양 or 파랑으로 칠해졌거나 하나의 정사각형이 되어 더 못자를때까지 반복
 *
 * 하얀색 색종이 개수 출력
 * 파란색 색종이 개수 출력
 */

let whiteCount = 0; //하얀색
let blueCount = 0; //파란색

/**
 * @param {number} r 시작 행
 * @param {number} c 시작 열
 * @param {number} n 한 변의 길이
 */
function solve(r, c, n) {
  const color = paper[r][c];
  let isSame = true;

  //모두 같은 색인지 확인
  for (let i = r; i < r + n; i++) {
    for (let j = c; j < c + n; j++) {
      if (paper[i][j] !== color) {
        isSame = false;
        break;
      }
    }
    if (!isSame) break;
  }

  // 다 같은 색이면
  if (isSame) {
    if (color === 0) whiteCount++;
    else blueCount++;
    return;
  }

  // 색이 섞여 있으면 4등분
  const half = n / 2;
  solve(r, c, half); // 왼쪽 위
  solve(r, c + half, half); // 오른쪽 위
  solve(r + half, c, half); // 왼쪽 아래
  solve(r + half, c + half, half); // 오른쪽 아래
}

solve(0, 0, N);

console.log(whiteCount);
console.log(blueCount);
