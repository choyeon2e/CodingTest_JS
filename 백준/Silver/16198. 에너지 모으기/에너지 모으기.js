"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const W = input[1].split(" ").map(Number);

/**
 * i번째 에너지 구슬의 무게 = W[i]
 *
 * 에너지 모으는 방법
 * 1. 고른 에너지 구슬의 번호 x. 첫,막 에너지 구슬은 고를 수 없음
 * 2. x번째 에너지 구슬 제거
 * 3. W[x-1]*W[x+1] 에너지 모으기 가능
 * 4. N을 1 감소. 에너지 구슬을 다시 1~N번까지로 번호 매기기
 *
 * 모을 수 있는 최대 에너지 양 = ?
 */

let answer = 0;

function selectEnergy(current, total) {
  if (current.length === 2) {
    answer = Math.max(total, answer);
    return;
  }

  for (let x = 1; x < current.length - 1; x++) {
    const gainEnergy = current[x - 1] * current[x + 1];

    const selected = current.splice(x, 1)[0]; //선택되어 제거된 구슬
    selectEnergy(current, total + gainEnergy);
    current.splice(x, 0, selected); //복구
  }
}

selectEnergy(W, 0);
console.log(answer);
