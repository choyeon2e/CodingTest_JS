/**
 * 동서남북 한칸씩 이동
 * 0: 벽, 1: 벽 x
 * 초기위치: (1,1) / 도착위치: (n,m)
 * 최단거리 = ?, 도착못하면 -1 리턴
 **/

const dr = [0, 0, -1, 1];
const dc = [-1, 1, 0, 0]; //동서남북

function in_range(n, m, r, c) {
    return r >= 1 && r <= n && c >= 1 && c <= m;
}

function bfs(n, m, maps) {
    const queue = [[1, 1]];
    const dist = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    dist[1][1] = 1;
    let head = 0;

    while (head < queue.length) {
        const [r, c] = queue[head++];
        if (r === n && c === m) return dist[r][c];

        for (let d = 0; d < 4; d++) {
            const nr = r + dr[d];
            const nc = c + dc[d];

            if (
                in_range(n, m, nr, nc) &&
                maps[nr - 1][nc - 1] === 1 &&
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

    return bfs(n, m, maps);
}
