const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function bfs(startPos, targetPos, maps, R, C) {
    const [sr, sc] = startPos;
    const [tr, tc] = targetPos;

    const visited = Array.from({ length: R }, () => Array(C).fill(false));
    const queue = [[sr, sc, 0]];

    visited[sr][sc] = true;

    let head = 0;
    while (head < queue.length) {
        const [r, c, dist] = queue[head++];

        if (r === tr && c === tc) return dist;

        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            if (
                nr >= 0 &&
                nr < R &&
                nc >= 0 &&
                nc < C &&
                maps[nr][nc] !== "X"
            ) {
                if (!visited[nr][nc]) {
                    visited[nr][nc] = true;
                    queue.push([nr, nc, dist + 1]);
                }
            }
        }
    }
    return -1;
}

function solution(maps) {
    const R = maps.length;
    const C = maps[0].length;

    let start, lever, exit;

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (maps[i][j] === "S") start = [i, j];
            else if (maps[i][j] === "L") lever = [i, j];
            else if (maps[i][j] === "E") exit = [i, j];
        }
    }

    const step1 = bfs(start, lever, maps, R, C);
    if (step1 === -1) return -1;

    const step2 = bfs(lever, exit, maps, R, C);
    if (step2 === -1) return -1;

    return step1 + step2;
}
