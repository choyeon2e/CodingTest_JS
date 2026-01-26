"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let line = 0;
const N = +input[line++];
const types = input[line++].split(" ").map(Number); // 0: 큐, 1: 스택
const initialValues = input[line++].split(" ").map(Number); // 초기 값
const M = +input[line++]; // 삽입할 값 개수
const insertValues = input[line++].split(" ").map(Number); // 삽입할 값들

const queue = [];

// 큐(0)인 자료구조의 값만 뽑아서 배열에 담기
// 먼저 들어간 값이 나중에 나오도록 역순으로 담기!!!
for (let i = 0; i < N; i++) {
  if (types[i] === 0) {
    queue.push(initialValues[i]);
  }
}
queue.reverse(); // 역순 정렬

// 새로 들어올 값들을 순서대로 처리
for (let i = 0; i < M; i++) {
  // 현재 큐의 맨 앞에 있는 값을 빼고, 새 값을 뒤에 넣는 로직
  // 하지만 실제로 넣고 뺄 필요 없이 기존 큐 값 -> 새 값 순서로 출력하면 됨

  /**
   * 로직:
   * 새로운 값 X가 큐스택에 들어오면
   * 첫번째 큐에 X가 들어가고 원래 있던 값 A가 튕겨나옴
   * 튕겨나온 A는 두번째 큐로 들어가고 거기 있던 B가 튕겨나옴
   * 마지막 큐에서 튕겨나온 값이 최종 출력값이 됨
   *
   * => 새로운 값이 들어올 때마다 모든 큐에 있던 데이터들이 한 칸씩 뒤로 밀려나감
   */
  queue.push(insertValues[i]);
}

/**
 *  M개만큼만 앞에서부터 출력
 * 하나의 거대한 줄을 세워놓고 앞에서부터 M개를 순서대로 읽기만 하면
 * 그것이 바로 각 단계에서 튕겨 나온 최종값이 됨
 */
console.log(queue.slice(0, M).join(" "));
