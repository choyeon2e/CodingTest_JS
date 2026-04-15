"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const str = input[0].split("");

/**
 * ㅋㅋ루ㅋㅋ 문자열
 * 1. R로만 이루어진 문자열
 * 2. ㅋㅋ루ㅋㅋ 문자열 양 끝에 K를 하나씩 붙인 문자열
 * 3. 빈 문자열은 아님
 *
 * 문자열의 부분 수열 중 가장 긴 ㅋㅋ루ㅋㅋ 문자열의 길이 출력
 * 없으면 0
 *
 * solve)
 * R의 위치를 저장하는 RPos 배열 생성
 * 전체 문자열에서 K의 개수를 관리하는 누적합 배열(KCount) 생성
 * 왼쪽 끝 R을 가리키는 left, 오른쪽 끝 R을 가리키는 right 포인터 설정
 *
 * 두 포인터가 만날 때까지 루프 돌리면서
 * 현재 left와 right 위치의 R을 포함하는 구간을 잡았을 때
 * 해당 R 구간의 왼쪽 K 개수와 오른쪽 K 개수 구하기
 * 2 * Math.min(왼쪽K, 오른쪽K) + (현재 구간 R의 개수)와 기존 max값을 비교 => 더 크면 max 교체
 * K의 개수가 더 적은 쪽의 포인터를 안쪽으로 이동시키며 반복
 */

const RPos = [];
const KCount = new Array(str.length + 1).fill(0);

for (let i = 0; i < str.length; i++) {
  KCount[i + 1] = KCount[i] + (str[i] === "K" ? 1 : 0); //누적합. 원하는 인덱스까지 K가 몇개 있는 지를 저장
  if (str[i] === "R") RPos.push(i); //R이면 R의 위치를 배열에 저장
}

// R이 아예 없는 경우
if (RPos.length === 0) {
  console.log(0);
  process.exit();
}

const totalK = KCount[str.length];
let max = 0;

//투포인터 인덱스 설정
let left = 0;
let right = RPos.length - 1;

while (left <= right) {
  //왼쪽 끝 R의 위치, 오른쪽 끝 R의 위치
  const leftR = RPos[left];
  const rightR = RPos[right];

  //왼쪽에 있는 K와 오른쪽에 있는 K 개수 계산
  const leftK = KCount[leftR];
  const rightK = totalK - KCount[rightR + 1];

  const RCount = right - left + 1; //현재 R 개수
  const minK = Math.min(leftK, rightK);

  const count = minK * 2 + RCount;
  if (count > max) max = count;

  if (leftK < rightK) {
    left++;
  } else {
    right--;
  }
}

console.log(max);
