class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(val) {
        this.heap.push(val);
        let index = this.heap.length - 1;

        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[parent][1] <= this.heap[index][1]) break;
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

            if (
                left < this.heap.length &&
                this.heap[left][1] < this.heap[min][1]
            )
                min = left;

            if (
                right < this.heap.length &&
                this.heap[right][1] < this.heap[min][1]
            )
                min = right;

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

function solution(jobs) {
    jobs.sort((a, b) => a[0] - b[0]);
    const heap = new MinHeap();

    let totalT = 0;
    let currentT = 0;
    let jobIdx = 0;
    let completeCount = 0;

    while (completeCount < jobs.length) {
        while (jobIdx < jobs.length && jobs[jobIdx][0] <= currentT) {
            heap.push(jobs[jobIdx]);
            jobIdx++;
        }

        if (heap.size() > 0) {
            const [requestT, duration] = heap.pop();
            currentT += duration;
            totalT += currentT - requestT;
            completeCount++;
        } else {
            currentT = jobs[jobIdx][0];
        }
    }

    return Math.floor(totalT / jobs.length);
}
