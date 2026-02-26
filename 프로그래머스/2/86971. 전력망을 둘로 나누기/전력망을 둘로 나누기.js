function Bfs(startNode, n, graph, exceptU, exceptV) {
    const queue = [startNode];
    const visited = Array(n + 1).fill(false);
    visited[startNode] = true;
    let count = 0;

    while (queue.length > 0) {
        const node = queue.shift();
        count++;

        for (const neighbor of graph[node]) {
            // 현재 끊기로 한 전선이면 이동 X
            if (
                (node === exceptU && neighbor === exceptV) ||
                (node === exceptV && neighbor === exceptU)
            ) {
                continue;
            }

            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    return count; // 연결된 노드의 총 개수
}

function solution(n, wires) {
    let answer = n;

    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of wires) {
        graph[u].push(v);
        graph[v].push(u);
    }

    for (const [u, v] of wires) {
        const count = Bfs(u, n, graph, u, v);
        const diff = Math.abs(count - (n - count));

        if (diff < answer) {
            answer = diff;
        }
    }

    return answer;
}
