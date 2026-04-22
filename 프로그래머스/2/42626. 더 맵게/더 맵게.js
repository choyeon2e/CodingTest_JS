/**
 * 모든 음식의 스코빌 지수를 K 이상으로 만들기
 * 스코빌 지수 가장 낮은 음식 2개를 섞음
 * 섞은 음식 스코빌지수 = 가장 안매운음식 스코빌지수 + (두번째로 안매운 음식 스코빌지수 * 2)
 * 모든 음식 스코빌지수 K 이상 되도록 반복
 * 섞기 최소 횟수 return
 **/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
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

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();

        let index = 0;

        while (true) {
            let left = index * 2 + 1;
            let right = index * 2 + 2;
            let min = index;

            if (left < this.heap.length && this.heap[left] < this.heap[min]) {
                min = left;
            }

            if (right < this.heap.length && this.heap[right] < this.heap[min]) {
                min = right;
            }

            if (min === index) break;

            [this.heap[index], this.heap[min]] = [
                this.heap[min],
                this.heap[index],
            ];
            index = min;
        }

        return root;
    }

    size() {
        return this.heap.length;
    }
}

function solution(scoville, K) {
    const heap = new MinHeap();
    scoville.forEach((s) => heap.push(s));

    let answer = 0;

    while (heap.heap[0] < K) {
        if (heap.heap.length < 2) return -1;
        const first = heap.pop();
        const second = heap.pop();

        heap.push(first + second * 2);
        answer++;
    }

    return answer;
}
