/**
 * 직사각형 격자 형태의 지도
 * X 또는 1~9 사이 자연수 적혀있음
 * X는 바다, 숫자는 무인도
 * 상,하,좌,우로 연결되는 땅들은 하나의 무인도를 이룸
 * 각 칸에 적힌 숫자는 식량을 뜻함
 * 상,하,좌,우로 연결되는 칸에 적힌 숫자를 모두 합한 값은 해당 무인도에서 최대 며칠 머물 수 있는가를 뜻함
 *
 * 각 섬에서 최대 며칠씩 머무를 수 있는지 배열에 오름차순으로 담아 return
 * 지낼 수 있는 무인도가 없으면 -1을 담아 return
 **/

//상하좌우
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function dfs(r, c, visited, board, R, C) {
    visited[r][c] = true;
    let sum = Number(board[r][c]);

    for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (nr >= 0 && nr < R && nc >= 0 && nc < C) {
            if (board[nr][nc] !== "X" && !visited[nr][nc]) {
                sum += dfs(nr, nc, visited, board, R, C);
            }
        }
    }
    return sum;
}

function solution(maps) {
    const answer = [];

    const R = maps.length;
    const C = maps[0].length;

    const visited = Array.from({ length: R }, () => Array(C).fill(false));

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (maps[i][j] !== "X" && !visited[i][j]) {
                const total = dfs(i, j, visited, maps, R, C);
                answer.push(total);
            }
        }
    }
    if (answer.length === 0) return [-1];
    return answer.sort((a, b) => a - b);
}
