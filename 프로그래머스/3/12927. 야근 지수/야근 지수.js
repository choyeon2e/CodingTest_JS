/**
 * 야근 피로도: 야근 시작 시점에서의 남은 일의 작업량 **2 해서 더한 값
 * N시간동안 야근 피로도를 최소화하도록 일하기
 *
 * 1시간 동안 작업량 1만큼 처리할 수 있다고 할 때 최소 야근 피로도는?
 **/

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

    size() {
        return this.heap.length;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

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
        const length = this.heap.length;

        while (index * 2 + 1 < length) {
            let left = index * 2 + 1;
            let right = index * 2 + 2;
            let largerChild = left;

            if (right < length && this.heap[right] > this.heap[left]) {
                largerChild = right;
            }

            if (this.heap[index] >= this.heap[largerChild]) break;

            [this.heap[index], this.heap[largerChild]] = [
                this.heap[largerChild],
                this.heap[index],
            ];
            index = largerChild;
        }
    }
}

function solution(n, works) {
    const total = works.reduce((acc, cur) => acc + cur, 0);
    if (total <= n) return 0;

    const maxHeap = new MaxHeap();
    for (const work of works) {
        maxHeap.push(work);
    }

    while (n > 0) {
        const max = maxHeap.pop();
        if (max > 0) {
            maxHeap.push(max - 1);
        }
        n--;
    }

    let result = 0;
    while (maxHeap.size() > 0) {
        const work = maxHeap.pop();
        result += work * work;
    }

    return result;
}
