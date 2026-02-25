"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//MaxHeap 구현
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return 0;
    if (this.size() === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return root;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] >= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.heap.length) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;
      let largerChild =
        rightChild < this.heap.length &&
        this.heap[rightChild] > this.heap[leftChild]
          ? rightChild
          : leftChild;

      if (this.heap[index] >= this.heap[largerChild]) break;
      [this.heap[index], this.heap[largerChild]] = [
        this.heap[largerChild],
        this.heap[index],
      ];
      index = largerChild;
    }
  }
}

let line = 0;
const N = +input[line++];
const heap = new MaxHeap();
const results = [];

for (let i = 0; i < N; i++) {
  const x = +input[line++];

  if (x === 0) {
    // 0이 들어오면 가장 큰 값 출력 후 제거
    results.push(heap.pop());
  } else {
    // 자연수가 들어오면 추가
    heap.push(x);
  }
}

console.log(results.join("\n"));
