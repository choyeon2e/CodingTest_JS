"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 우선순위 힙 구현
 */

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
    const top = this.heap[0];
    this.heap[0] = this.heap.pop(); //맨 뒤에 있는걸 빼서 맨 앞으로 씌우기
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
      } else {
        break;
      }
    }
  }
  bubbleDown() {
    let index = 0;
    //왼쪽 자식이 있다 => 내려갈 가능성이 있음을 뜻함
    while (index * 2 + 1 < this.heap.length) {
      let left = index * 2 + 1,
        right = index * 2 + 2,
        smallerChild = left; //왼쪽이 더 작다고 가정

      //오른쪽에 자식이 있고, 오른쪽이 왼쪽보다 작다면
      // 더 작은쪽과 바꿔야하므로 smallerChild를 오른쪽으로 교체
      if (
        right < this.heap.length &&
        this.heap[right][1] < this.heap[left][1]
      ) {
        smallerChild = right;
      }

      //자식 중 제일 작은 것보다 더 작으면 멈추기
      if (this.heap[index][1] <= this.heap[smallerChild][1]) {
        break;
      } else {
        //아니라면 자리를 바꾸고 아래로 내려감
        [this.heap[index], this.heap[smallerChild]] = [
          this.heap[smallerChild],
          this.heap[index],
        ];
        index = smallerChild;
      }
    }
  }
}

const [V, E] = input[0].split(" ").map(Number);
const K = +input[1]; //시작정점 번호

const adj = Array.from({ length: V + 1 }, () => []); //인접리스트

for (let i = 2; i < input.length; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  adj[u].push([v, w]); //u번 정점에서 v번 정점으로 가는 가중치 w인 간선
}

const dist = Array(V + 1).fill(Infinity);

function dijkstra(start) {
  const pq = new MinHeap();
  dist[start] = 0;

  pq.push([start, 0]); //[노드번호, 거리]

  while (pq.size() > 0) {
    const [curr, d] = pq.pop();

    if (dist[curr] < d) continue; //꺼낸 거리가 이미 기록된 거리보다 크다면 무시

    //현재 노드와 연결된 인접 노드 확인
    for (const [next, weight] of adj[curr]) {
      const nextDist = d + weight;

      if (nextDist < dist[next]) {
        //더 짧은 경로를 발견한다면 업데이트
        dist[next] = nextDist;
        pq.push([next, nextDist]);
      }
    }
  }
}

dijkstra(K);

let answer = "";
for (let i = 1; i <= V; i++) {
  if (dist[i] === Infinity) {
    answer += "INF\n";
  } else {
    answer += dist[i] + "\n";
  }
}

console.log(answer);
