"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = [+input[0], +input[1]];
const adj = Array.from({ length: N + 1 }, () => []);

for (let i = 2; i < M + 2; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  adj[u].push([v, w]);
}

const [startNode, endNode] = input[M + 2].split(" ").map(Number);

class MinHeap {
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
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][1] > this.heap[index][1]) {
        [this.heap[parent], this.heap[index]] = [
          this.heap[index],
          this.heap[parent],
        ];
        index = parent;
      } else break;
    }
  }

  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.heap.length) {
      let left = index * 2 + 1,
        right = index * 2 + 2,
        smaller = left;
      if (
        right < this.heap.length &&
        this.heap[right][1] < this.heap[left][1]
      ) {
        smaller = right;
      }
      if (this.heap[index][1] <= this.heap[smaller][1]) break;
      [this.heap[index], this.heap[smaller]] = [
        this.heap[smaller],
        this.heap[index],
      ];
      index = smaller;
    }
  }
}

function dijkstra(start) {
  const dist = Array(N + 1).fill(Infinity);
  const pq = new MinHeap();

  dist[start] = 0;
  pq.push([start, 0]);

  while (pq.size() > 0) {
    const [curr, d] = pq.pop();
    if (dist[curr] < d) continue;

    for (const [next, weight] of adj[curr]) {
      const nextDist = d + weight;
      if (nextDist < dist[next]) {
        dist[next] = nextDist;
        pq.push([next, nextDist]);
      }
    }
  }
  return dist;
}

const result = dijkstra(startNode);
console.log(result[endNode]);
