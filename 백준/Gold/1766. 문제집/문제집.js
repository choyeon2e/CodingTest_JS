"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  pop() {
    if (this.size() === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }
  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.heap.length) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let next = left;
      if (right < this.heap.length && this.heap[right] < this.heap[left])
        next = right;
      if (this.heap[index] <= this.heap[next]) break;
      [this.heap[index], this.heap[next]] = [this.heap[next], this.heap[index]];
      index = next;
    }
  }
  size() {
    return this.heap.length;
  }
}

const [N, M] = input[0].split(" ").map(Number);
const adj = Array.from({ length: N + 1 }, () => []);
const solveNum = Array(N + 1).fill(0);

for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].split(" ").map(Number);
  adj[A].push(B);
  solveNum[B]++;
}

/**
 * 문제 푸는 순서
 * 1. N개의 문제는 모두 풀기
 * 2. 먼저 푸는 것이 좋은 문제가 있으면 반드시 먼저 풀어야함
 * 3. 가능하면 쉬운 문제부터 풀기
 *
 *
 * solve)
 * adj에 A 풀고나서 풀 수 있는 문제들 넣기 (B)
 * solveNum에 각 문제를 풀기 전에 풀어야하는 문제 수 넣기
 * 쉬운 문제부터 풀기 => solveNum이 작은 문제부터 풀어야함 => 우선순위 큐
 */

const heap = new MinHeap();
const result = [];

for (let i = 1; i <= N; i++) {
  if (solveNum[i] === 0) heap.push(i); //먼저 풀어야하는 문제 없는걸 heap에 넣기
}

while (heap.size() > 0) {
  const current = heap.pop();
  result.push(current); //current는 풀었으니까

  for (const next of adj[current]) {
    solveNum[next]--; //current를 풀었으니까
    if (solveNum[next] === 0) {
      heap.push(next); //재귀
    }
  }
}
console.log(result.join(" "));
