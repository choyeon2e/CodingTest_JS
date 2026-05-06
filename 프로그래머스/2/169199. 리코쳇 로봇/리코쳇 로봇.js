/**
 * 리코쳇 로봇 게임
 * 시작 위치에서 출발 => 목표 위치에 멈추기 위해 최소 몇번 이동해야하는가?
 *
 * 상,하,좌,우 한 방향으로 장애물이나 가장자리에 부딪힐 때까지 움직이는 것이 한 번의 이동
 *
 * . : 빈공간
 * R: 로봇 처음위치
 * D: 장애물 위치
 * G: 목표 지점
 *
 **/

function solution(board) {
    //상하좌우
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    const R = board.length;
    const C = board[0].length;

    //시작지점 찾기
    let start = [];
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (board[i][j] === "R") {
                start = [i, j];
            }
        }
    }

    const queue = [[...start, 0]];
    const visited = Array.from({ length: R }, () => Array(C).fill(false));

    visited[start[0]][start[1]] = true;

    //bfs
    let head = 0;
    while (head < queue.length) {
        const [r, c, dist] = queue[head++];
        if (board[r][c] === "G") return dist;

        for (let i = 0; i < 4; i++) {
            let nr = r;
            let nc = c;

            while (true) {
                let nextR = nr + dr[i];
                let nextC = nc + dc[i];

                if (
                    nextR >= R ||
                    nextR < 0 ||
                    nextC < 0 ||
                    nextC >= C ||
                    board[nextR][nextC] === "D"
                ) {
                    break;
                }
                nr = nextR;
                nc = nextC;
            }

            if (!visited[nr][nc]) {
                visited[nr][nc] = true;
                queue.push([nr, nc, dist + 1]);
            }
        }
    }
    return -1;
}
