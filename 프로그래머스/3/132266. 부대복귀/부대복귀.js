function solution(n, roads, sources, destination) {
    const graph = Array.from({ length: n + 1 }, () => []);
    const distance = Array(n + 1).fill(-1);
    const queue = [destination];
    let head = 0;

    for (const [a, b] of roads) {
        graph[a].push(b);
        graph[b].push(a);
    }

    distance[destination] = 0;

    while (head < queue.length) {
        const current = queue[head++];

        for (const next of graph[current]) {
            if (distance[next] !== -1) continue;
            distance[next] = distance[current] + 1;
            queue.push(next);
        }
    }
    return sources.map((source) => distance[source]);
}
