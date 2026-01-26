"use strict";

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

class MinHeap {
  constructor() {
    this.nodes = [];
  }

  push(val) {
    this.nodes.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.nodes.length === 0) return null;
    if (this.nodes.length === 1) return this.nodes.pop();
    const root = this.nodes[0];
    this.nodes[0] = this.nodes.pop();
    this.bubbleDown();
    return root;
  }

  // 현재 힙의 루트(가장 작은 값) 확인
  peek() {
    return this.nodes[0];
  }

  size() {
    return this.nodes.length;
  }

  bubbleUp() {
    let idx = this.nodes.length - 1;
    const val = this.nodes[idx];

    while (idx > 0) {
      let pIdx = (idx - 1) >> 1;
      if (this.nodes[pIdx] > val) {
        this.nodes[idx] = this.nodes[pIdx];
        idx = pIdx;
      } else break;
    }
    this.nodes[idx] = val;
  }

  bubbleDown() {
    let idx = 0;
    const val = this.nodes[0];
    const len = this.nodes.length;
    while (true) {
      let left = (idx << 1) + 1;
      let right = (idx << 1) + 2;
      let swapIdx = null;

      if (left < len && this.nodes[left] < val) swapIdx = left;
      if (right < len) {
        if (
          (swapIdx === null && this.nodes[right] < val) ||
          (swapIdx !== null && this.nodes[right] < this.nodes[left])
        ) {
          swapIdx = right;
        }
      }

      if (swapIdx === null) break;
      this.nodes[idx] = this.nodes[swapIdx];
      idx = swapIdx;
    }
    this.nodes[idx] = val;
  }
}

let N = -1;
const minHeap = new MinHeap();

rl.on("line", (line) => {
  if (N === -1) {
    N = parseInt(line); // 첫 번째 줄에서 N 읽기
    return;
  }

  const nums = line.split(" ");
  for (let i = 0; i < nums.length; i++) {
    const num = Number(nums[i]);

    minHeap.push(num);
    if (minHeap.size() > N) {
      minHeap.pop();
    }
  }
});

rl.on("close", () => {
  console.log(minHeap.peek());
});
