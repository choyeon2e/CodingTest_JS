/**
 * 출발 지점 -> 레버 칸 -> 출구 문
 * ==>> 출발지점 ~ 레버칸 bfs 1차 + 레버칸 ~ 출구 bfs 2차
 *
 * 한 칸 이동하는데에 1초 -> 최단시간(=1초 걸리므로 최단거리)
 **/

//상하좌우
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function in_range(nr, nc, n, m) {
    return nr >= 0 && nr < n && nc >= 0 && nc < m;
}

function bfs(ts, te, maps, n, m) {
    const dist = Array.from({ length: n }, () => new Array(m).fill(-1));
    dist[ts[0]][ts[1]] = 0;

    const queue = [ts];
    let head = 0;

    while (head < queue.length) {
        const [r, c] = queue[head++];
        if (r === te[0] && c === te[1]) return dist[r][c];

        for (let d = 0; d < 4; d++) {
            const nr = r + dr[d];
            const nc = c + dc[d];

            if (
                in_range(nr, nc, n, m) &&
                maps[nr][nc] !== "X" &&
                dist[nr][nc] === -1
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
    let start, lever, exit;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (maps[i][j] === "S") start = [i, j];
            else if (maps[i][j] === "L") lever = [i, j];
            else if (maps[i][j] === "E") exit = [i, j];
        }
    }

    const toLever = bfs(start, lever, maps, n, m);
    if (toLever === -1) return -1;

    const toExit = bfs(lever, exit, maps, n, m);
    if (toExit === -1) return -1;

    return toLever + toExit;
}
