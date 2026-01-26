"use strict";

const fs = require("fs");

/**
 * fs.readFileSync()로 받은 Buffer를 직접 오프셋(offset)으로 읽어 메모리 점유를 최소화
 */
const buffer = fs.readFileSync(
  process.platform === "linux" ? "/dev/stdin" : "./input.txt",
);
let offset = 0;

// 공백이나 줄바꿈을 건너뛰고 다음 단어를 읽는 함수
function nextString() {
  while (offset < buffer.length && buffer[offset] <= 32) offset++;
  let start = offset;
  while (offset < buffer.length && buffer[offset] > 32) offset++;
  return buffer.slice(start, offset).toString();
}

// 다음 정수를 읽는 함수
function nextInt() {
  return parseInt(nextString());
}

/**
 * 힙 내부 노드를 [value, id] 형태의 '배열 객체'로 관리하면 100만 개 삽입 시 GC(가비지 컬렉터) 부하가 심함
 * 이를 방지하기 위해 value와 id를 별개의 원시 배열(values, ids)로 관리
 */
class Heap {
  constructor(isMaxHeap = false) {
    this.values = []; // 실제 숫자(우선순위 기준)를 담는 배열
    this.ids = []; // 삽입 순서(ID)를 담는 배열
    this.isMaxHeap = isMaxHeap;
  }

  push(val, id) {
    this.values.push(val);
    this.ids.push(id);
    this.bubbleUp();
  }

  /**
   * 루트 노드를 추출하고 재정렬함
   * @returns {Object|null} 유효한 데이터가 있으면 {val, id} 객체 반환
   */
  pop() {
    if (this.values.length === 0) return null;
    if (this.values.length === 1) {
      return { val: this.values.pop(), id: this.ids.pop() };
    }
    const root = { val: this.values[0], id: this.ids[0] };
    this.values[0] = this.values.pop();
    this.ids[0] = this.ids.pop();
    this.bubbleDown();
    return root;
  }

  peek() {
    // [0]은 값, [1]은 ID를 의미
    return this.values.length > 0 ? [this.values[0], this.ids[0]] : null;
  }

  isEmpty() {
    return this.values.length === 0;
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    while (idx > 0) {
      let pIdx = (idx - 1) >> 1; // 부모 인덱스: (n-1)/2
      if (this.compare(this.values[idx], this.values[pIdx])) {
        this.swap(idx, pIdx);
        idx = pIdx;
      } else break;
    }
  }

  bubbleDown() {
    let idx = 0;
    const len = this.values.length;
    while (true) {
      let left = (idx << 1) + 1; // 왼쪽 자식: n*2 + 1
      let right = (idx << 1) + 2; // 오른쪽 자식: n*2 + 2
      let swapIdx = null;

      // 왼쪽 자식과 우선순위 비교
      if (left < len && this.compare(this.values[left], this.values[idx])) {
        swapIdx = left;
      }
      // 오른쪽 자식이 있다면, 부모 혹은 왼쪽 자식보다 우선순위가 높은지 비교
      if (right < len) {
        if (
          (swapIdx === null &&
            this.compare(this.values[right], this.values[idx])) ||
          (swapIdx !== null &&
            this.compare(this.values[right], this.values[left]))
        ) {
          swapIdx = right;
        }
      }

      if (swapIdx === null) break;
      this.swap(idx, swapIdx);
      idx = swapIdx;
    }
  }

  // 두 인덱스의 값을 맞바꿈 (값 배열과 ID 배열 모두 스왑)
  swap(i, j) {
    let tmpV = this.values[i];
    this.values[i] = this.values[j];
    this.values[j] = tmpV;

    let tmpI = this.ids[i];
    this.ids[i] = this.ids[j];
    this.ids[j] = tmpI;
  }

  compare(a, b) {
    return this.isMaxHeap ? a > b : a < b;
  }
}

// Uint8Array는 0~255 사이의 정수만 담는 TypedArray로, 일반 Array보다 메모리를 훨씬 적게 씀
const isValid = new Uint8Array(1000001);
const T = nextInt();
const results = [];

for (let t = 0; t < T; t++) {
  const k = nextInt();
  const maxHeap = new Heap(true);
  const minHeap = new Heap(false);

  // 현재 테스트 케이스에서 사용할 ID 범위만큼만 초기화 (1: 존재, 0: 삭제됨)
  for (let i = 0; i < k; i++) isValid[i] = 0;

  for (let i = 0; i < k; i++) {
    const cmd = nextString();
    const num = nextInt();

    if (cmd === "I") {
      maxHeap.push(num, i); // 값과 고유 ID(삽입 순서 i)를 함께 저장
      minHeap.push(num, i);
      isValid[i] = 1;
    } else {
      const targetHeap = num === 1 ? maxHeap : minHeap;

      /**
       * 지연 삭제
       * 힙의 루트(peek)에 있는 놈의 ID가 이미 다른 힙에서 삭제된 상태(isValid == 0)라면
       * 진짜 유효한 노드가 나올 때까지 pop()하여 쓰레기 데이터를 청소
       */
      while (!targetHeap.isEmpty() && isValid[targetHeap.peek()[1]] === 0) {
        targetHeap.pop();
      }

      if (!targetHeap.isEmpty()) {
        const popped = targetHeap.pop();
        isValid[popped.id] = 0; // ID를 0으로 바꿔 이 숫자는 이제 죽었다고 양쪽 힙에 알림
      }
    }
  }

  while (!maxHeap.isEmpty() && isValid[maxHeap.peek()[1]] === 0) maxHeap.pop();
  while (!minHeap.isEmpty() && isValid[minHeap.peek()[1]] === 0) minHeap.pop();

  if (maxHeap.isEmpty()) {
    results.push("EMPTY");
  } else {
    results.push(`${maxHeap.peek()[0]} ${minHeap.peek()[0]}`);
  }
}

process.stdout.write(results.join("\n") + "\n");