/**
 * 리코쳇 로봇: R에서 G 도달까지 최소 몇번 이동?
 *
 * 상하좌우로 이동. D or 가장자리 부딪힐때까지 움직이는게 한번의 이동
 * 만약 G에 도달 불가하면 -1 리턴
 *
 * solve)
 * R에서 출발 -> bfs로 상하좌우로 이동
 **/

//상하좌우
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function in_range(r, c, n, m) {
    return r >= 0 && r < n && c >= 0 && c < m;
}

function slide(board, r, c, d, n, m) {
    while (true) {
        const nr = r + dr[d];
        const nc = c + dc[d];

        //다음칸이 가장자리거나 D인경우 ==> 슬라이딩 한번 후 멈추는 위치
        if (!in_range(nr, nc, n, m) || board[nr][nc] === "D") break;

        r = nr;
        c = nc;
    }

    return [r, c];
}

function bfs(board, R, n, m) {
    const dist = Array.from({ length: n }, () => new Array(m).fill(-1));
    const [startR, startC] = R;
    dist[startR][startC] = 0;

    const queue = [R];
    let head = 0;

    while (head < queue.length) {
        const [r, c] = queue[head++];
        if (board[r][c] === "G") return dist[r][c];

        for (let d = 0; d < 4; d++) {
            const [nr, nc] = slide(board, r, c, d, n, m);
            if (dist[nr][nc] === -1) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }
    return -1;
}

function solution(board) {
    const n = board.length;
    const m = board[0].length;
    let R;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === "R") R = [i, j];
        }
    }
    return bfs(board, R, n, m);
}
