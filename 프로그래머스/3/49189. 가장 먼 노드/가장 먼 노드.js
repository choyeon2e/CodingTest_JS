function solution(n, edge) {
    const graph = Array.from({ length: n + 1 }, () => []);
    const dist = new Array(n + 1).fill(-1);

    for (const [a, b] of edge) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const queue = [1];
    dist[1] = 0;

    let head = 0;
    while (head < queue.length) {
        const curr = queue[head++];

        for (const n of graph[curr]) {
            if (dist[n] === -1) {
                dist[n] = dist[curr] + 1;
                queue.push(n);
            }
        }
    }

    let max = 0;
    let count = 0;

    for (let i = 1; i <= n; i++) {
        const d = dist[i];
        if (d > max) {
            max = d;
            count = 1;
        } else if (d === max) {
            count++;
        }
    }
    return count;
}
