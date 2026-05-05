function dfs(node, n, computers, visited) {
    visited[node] = true;

    for (let i = 0; i < n; i++) {
        if (i !== node && computers[node][i] === 1 && !visited[i]) {
            dfs(i, n, computers, visited);
        }
    }
}

function solution(n, computers) {
    let answer = 0;
    const visited = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, n, computers, visited);
            answer++;
        }
    }
    return answer;
}
