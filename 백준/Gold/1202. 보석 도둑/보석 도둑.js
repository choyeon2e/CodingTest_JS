"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return max;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] >= this.heap[index]) break;
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
      if (right < this.heap.length && this.heap[right] > this.heap[left])
        next = right;
      if (this.heap[index] >= this.heap[next]) break;
      [this.heap[index], this.heap[next]] = [this.heap[next], this.heap[index]];
      index = next;
    }
  }

  size() {
    return this.heap.length;
  }
}

/**
 * 보석 총 개수 N
 * 각 보석의 무게 M[i], 각 보석의 가격 V[i]
 * 상덕이가 가진 가방 K개
 * 각 가방에 담을 수 있는 최대 무게 C[i] (최대 한개의 보석만 넣기 가능)
 * 상덕이가 훔칠 수 있는 보석 최대 가격 = ?
 *
 * solve)
 * 가방을 무게순으로 오름차순 정렬, 보석도 무게 기준으로 오름차순 정렬
 * 각 가방에 넣을 수 있는 보석 다 힙에 넣기
 * 그 중에 젤 비싼걸 꺼내서(=maxHeap이니까 pop하면됨) result 더하기
 */

const [N, K] = input[0].split(" ").map(Number);

//보석 무게와 가격
const jewels = [];
for (let i = 1; i <= N; i++) {
  jewels.push(input[i].split(" ").map(Number)); //[무게, 가격]
}
jewels.sort((a, b) => a[0] - b[0]);

//가방에 담을 수 있는 최대 무게
const bags = [];
for (let i = N + 1; i <= N + K; i++) {
  bags.push(Number(input[i]));
}
bags.sort((a, b) => a - b);

const heap = new MaxHeap();
let result = 0;
let idx = 0;

for (let i = 0; i < K; i++) {
  const bag = bags[i];

  while (idx < N && jewels[idx][0] <= bag) {
    heap.push(jewels[idx][1]); //가격 힙에 푸시
    idx++;
  }

  if (heap.size() > 0) {
    result += heap.pop(); //maxheap이니까 마지막에 있는게 제일 비싼 보석
  }
}

console.log(result);
