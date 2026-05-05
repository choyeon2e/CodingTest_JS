//상하좌우
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function bfs(maps, n, m) {
    const queue = [[0, 0]];

    while (queue.length > 0) {
        const [r, c] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                if (maps[nr][nc] === 1) {
                    maps[nr][nc] = maps[r][c] + 1;
                    queue.push([nr, nc]);
                }
            }
        }
    }
    const target = maps[n - 1][m - 1];

    return target === 1 ? -1 : target; //1이면 벽에 막힌거
}

function solution(maps) {
    const n = maps.length; //세로
    const m = maps[0].length; //가로

    return bfs(maps, n, m);
}
