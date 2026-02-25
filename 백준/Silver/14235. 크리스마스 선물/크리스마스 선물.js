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
    if (this.size() === 0) return -1;
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

/**
 * 세계 곳곳에 거점을 세워서 거길 방문하며 선물 충전
 * 착한 아이들 만나면 가장 가치가 큰 선물
 * 아이들에게 준 선물들의 가치 =?
 * 만약 없다면 -1 출력
 */

let line = 0;
const N = +input[line++];
const gift = new MaxHeap();
const result = [];

for (let i = 0; i < N; i++) {
  const current = input[line++].trim().split(" ").map(Number);
  const A = current[0]; //선물의 개수

  if (A === 0) {
    //만약에 선물을 충전 안했으면
    if (gift.size() === 0) {
      //줄 선물이 하나도 없으면
      result.push(-1);
    } else {
      /**
       * 선물을 줄 게 있다면
       * => 제일 가치있는 걸 꺼내서 주기
       */
      result.push(gift.pop());
    }
  } else {
    //선물 A개 충전
    for (let j = 1; j <= A; j++) {
      gift.push(current[j]);
    }
  }
}

console.log(result.join("\n"));
