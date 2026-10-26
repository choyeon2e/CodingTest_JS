/**
 * 동서남북 한칸씩 이동
 * 0: 벽, 1: 벽 x
 * 초기위치: (1,1), 도착위치: (n,m)
 * 최단거리 = ?, 도착못하면 -1 리턴
 **/

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function in_range(n, m, r, c) {
    return r >= 0 && r < n && c >= 0 && c < m;
}

function bfs(maps, n, m) {
    const dist = Array.from({ length: n }, () => new Array(m).fill(0));
    dist[0][0] = 1;
    let head = 0;
    const queue = [[0, 0]];

    while (head < queue.length) {
        const [r, c] = queue[head++];
        if (r === n - 1 && c === m - 1) return dist[r][c];

        for (let d = 0; d < 4; d++) {
            const nr = r + dr[d];
            const nc = c + dc[d];

            if (
                in_range(n, m, nr, nc) &&
                maps[nr][nc] === 1 &&
                dist[nr][nc] === 0
            ) {
                dist[nr][nc] += dist[r][c] + 1;
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
