/**
 * 지도: 직사각형 격자
 * 'X'or 1~9 자연수
 * 'X': 바다, 1~9: 무인도
 * 상하좌우 연결된 땅은 하나의 무인도를 이룸
 * (적힌 숫자를 모두 합하면 그 무인도 최대 머물수있는 기간)
 *
 * 각 칸에 적힌 숫자: 식량
 * 각 섬에서 최대 며칠 머무를 수 있는가 오름차순 리턴 (지낼수있는 무인도 없으면 -1 리턴)
 *
 * solve)
 * 숫자 지점에서 시작해서 X가 아닌 칸으로 bfs해서 group 만들고 group 총합 push(무인도)
 * 다음 숫자 지점에서 bfs 반복
 *
 **/

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function in_range(r, c, n, m) {
    return r >= 0 && r < n && c >= 0 && c < m;
}

function bfs(maps, i, j, n, m, visited) {
    visited[i][j] = true;
    const queue = [[i, j]];
    let head = 0;
    let sum = Number(maps[i][j]);

    while (head < queue.length) {
        const [r, c] = queue[head++];

        for (let d = 0; d < 4; d++) {
            const nr = r + dr[d];
            const nc = c + dc[d];

            if (
                in_range(nr, nc, n, m) &&
                maps[nr][nc] !== "X" &&
                !visited[nr][nc]
            ) {
                sum += Number(maps[nr][nc]);
                visited[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }
    return sum;
}

function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;
    const answer = [];

    const visited = Array.from({ length: n }, () => new Array(m).fill(false));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (maps[i][j] !== "X" && !visited[i][j]) {
                const result = bfs(maps, i, j, n, m, visited);
                answer.push(result);
            }
        }
    }
    if (answer.length === 0) return [-1];
    return answer.sort((a, b) => a - b);
}
