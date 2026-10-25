//상하좌우
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

//범위 내에 있는지 확인
function in_range(nr, nc, n, m) {
    return nr >= 0 && nr < n && nc >= 0 && nc < m;
}

//bfs 함수
function bfs(maps, n, m) {
    const dist = Array.from({ length: n }, () => new Array(m).fill(0));
    dist[0][0] = 1;

    const queue = [[0, 0]];
    let head = 0;

    while (head < queue.length) {
        const [r, c] = queue[head++];
        if (r === n - 1 && c === m - 1) return dist[r][c];

        for (let d = 0; d < 4; d++) {
            const nr = r + dr[d];
            const nc = c + dc[d];

            if (
                in_range(nr, nc, n, m) &&
                maps[nr][nc] === 1 &&
                dist[nr][nc] === 0
            ) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }
    return -1;
}

function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;

    return bfs(maps, n, m);
}
