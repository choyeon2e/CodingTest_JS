"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//Heap 구현
class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
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
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIndex = Math.floor((idx - 1) / 2);
      if (this.compare(this.heap[idx], this.heap[parentIndex]) < 0) {
        [this.heap[idx], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[idx],
        ];
        idx = parentIndex;
      } else break;
    }
  }

  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let leftChild = idx * 2 + 1;
      let rightChild = idx * 2 + 2;
      let target = leftChild;

      if (
        rightChild < this.heap.length &&
        this.compare(this.heap[rightChild], this.heap[leftChild]) < 0
      )
        target = rightChild;
      if (this.compare(this.heap[target], this.heap[idx]) < 0) {
        [this.heap[idx], this.heap[target]] = [
          this.heap[target],
          this.heap[idx],
        ];
        idx = target;
      } else break;
    }
  }
  top() {
    return this.heap[0];
  }
}

/**
 * 두 힙의 경계선이 중간값이 되는 원리를 이용
 * maxHeap: 정렬된 데이터의 앞 절반을 담음 => 그중 가장 큰 값이 루트이자 우리가 찾는 중간값
 * minHeap: 정렬된 데이터의 뒤 절반을 담음 => 그중 가장 작은 값이 루트이자 우리가 찾는 중간값
 * 만약 maxHeap.top() > minHeap.top() => 둘을 바꿔서 재정리
 */
const N = +input[0];
const maxHeap = new Heap((a, b) => b - a);
const minHeap = new Heap((a, b) => a - b);

const result = [];

for (let i = 1; i <= N; i++) {
  const x = +input[i];
  /**
   * 만약 전체 개수가 홀수이면 maxHeap의 가장 큰게 딱 중간값이 됨
   */
  if (maxHeap.size() === minHeap.size()) maxHeap.push(x);
  else minHeap.push(x);

  if (minHeap.size() > 0 && maxHeap.top() > minHeap.top()) {
    const v1 = maxHeap.pop();
    const v2 = minHeap.pop();
    minHeap.push(v1);
    maxHeap.push(v2);
  }

  result.push(maxHeap.top());
}

console.log(result.join("\n"));
