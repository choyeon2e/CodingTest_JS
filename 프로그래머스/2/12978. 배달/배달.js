class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(value) {
        this.heap.push(value);
        this.bubbleUp();
    }
    pop() {
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
            if (this.heap[parent][1] <= this.heap[index][1]) {
                break;
            } else {
                [this.heap[parent], this.heap[index]] = [
                    this.heap[index],
                    this.heap[parent],
                ];
                index = parent;
            }
        }
    }
    bubbleDown() {
        let index = 0;
        while (index * 2 + 1 < this.heap.length) {
            let left = index * 2 + 1,
                right = index * 2 + 2,
                smallerChild = left;

            if (
                right < this.heap.length &&
                this.heap[right][1] < this.heap[left][1]
            ) {
                smallerChild = right;
            }

            if (this.heap[index][1] <= this.heap[smallerChild][1]) break;

            [this.heap[index], this.heap[smallerChild]] = [
                this.heap[smallerChild],
                this.heap[index],
            ];
            index = smallerChild;
        }
    }
}

function dijkstra(start, dist, adj) {
    const pq = new MinHeap();
    dist[start] = 0; //시작노드 초기화

    pq.push([start, 0]);

    while (pq.size() > 0) {
        const [curr, d] = pq.pop();
        if (dist[curr] < d) {
            continue;
        }

        for (const [next, weight] of adj[curr]) {
            const nextDist = weight + d;
            if (nextDist < dist[next]) {
                dist[next] = nextDist;
                pq.push([next, nextDist]);
            }
        }
    }
}

function solution(N, road, K) {
    const adj = Array.from({ length: N + 1 }, () => []);
    for (const [a, b, c] of road) {
        adj[a].push([b, c]); //[마을 번호, 걸리는 시간]
        adj[b].push([a, c]);
    }

    const distances = new Array(N + 1).fill(Infinity);
    dijkstra(1, distances, adj);

    let answer = 0;
    for (let i = 0; i < distances.length; i++) {
        if (distances[i] <= K) answer++;
    }
    return answer;
}
