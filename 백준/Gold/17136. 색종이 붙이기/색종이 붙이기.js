"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const papers = input.map((line) => line.split(" ").map(Number));

/**
 * 정사각형 모양의 다섯종류 색종이 존재
 * 크기는 1x1, 2x2, 3x3, 4x4, 5x5 다섯종류 => 각 5개씩
 *
 * 색종이를 10x10 종이 위에 붙이기
 * 종이는 1x1 칸으로 나누어져있고 각각 0 or 1이 적혀있음
 * 1이 적힌 칸은 모두 색종이로 덮여져야함
 * => 종이의 경계 밖으로 나가서는 안되고 겹쳐도 안됨. 칸의 경계와 일치하게 붙여야함
 *
 * 1이 적힌 모든 칸을 붙이는데 필요한 색종이의 최소 개수 = ?
 * 1을 모두 덮는게 불가능하면 -1 출력
 */

const colorPapersNum = [0, 5, 5, 5, 5, 5]; //각 크기별 색종이 수

/**
 * r,c 위치에 size 크기의 색종이 붙일 수 있는지 확인
 * @param {number} r 시작 행 (row)
 * @param {number} c 시작 열 (column)
 * @param {number} size 색종이 크기 (1~5)
 * @returns {boolean} 붙일 수 있으면 true, 없으면 false
 *
 */
function putColorPaper(r, c, size) {
  if (r + size > 10 || c + size > 10) return false;

  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      // 해당 영역 내부에 값이 하나라도 0이면 못 붙임
      if (papers[i][j] === 0) return false;
    }
  }
  return true;
}

/**
 * r, c 위치에서부터 size만큼을 updateNum값으로 업데이트
 * @param {number} r 시작 행 (row)
 * @param {number} c 시작 열 (column)
 * @param {number} size 색종이 크기 (1~5)
 * @param {number} updateNum 변경할 값 (색종이 붙이기 -> 0 / 색종이 떼기 -> 1)
 *
 */
function updatePaper(r, c, size, updateNum) {
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      papers[i][j] = updateNum;
    }
  }
}

let answer = Infinity;

function dfs(r, c, count) {
  if (count >= answer) return;

  //모든 행을 다 돌면
  if (r === 10) {
    answer = Math.min(answer, count);
    return;
  }

  if (c === 10) {
    dfs(r + 1, 0, count); //다음 행
    return;
  }

  //1이면
  if (papers[r][c] === 1) {
    for (let size = 5; size >= 1; size--) {
      if (colorPapersNum[size] > 0 && putColorPaper(r, c, size)) {
        // 색종이 붙이기
        updatePaper(r, c, size, 0);
        colorPapersNum[size]--;

        dfs(r, c + 1, count + 1);

        //복구해주기 -> 백트래킹
        updatePaper(r, c, size, 1);
        colorPapersNum[size]++;
      }
    }
  } else {
    //0이면 다음칸
    dfs(r, c + 1, count);
  }
}

dfs(0, 0, 0);

console.log(answer === Infinity ? -1 : answer);
