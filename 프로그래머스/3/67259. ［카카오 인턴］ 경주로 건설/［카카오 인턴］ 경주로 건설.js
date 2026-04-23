/**
 * 경주로 부지 NxN 정사각형 격자 형태
 * 각 격자는 1x1 크기
 *
 * 0 or 1로 채워져있고 0은 비어있음, 1은 벽으로 채워져있음을 뜻함
 * 경주로 출발점 (0,0), 도착점 (N-1, N-1)
 * 출발점에서 도착점까지 끊기지 않도록 경주로 건설해야함
 * 상,하,좌,우 인접한 두 빈칸을 연결해 건설 가능, 벽이 있으면 건설 불가
 * 두 직선도로가 서로 직각으로 만나는 지점: 코너
 * 건설 비용: 직선도로 하나 만들 때 100원, 코너 하나 만들 때 500원
 * 경주로 건설에 필요한 최소 비용 = ?
 *
 * 2차원 배열 board가 매개변수로 주어질때 경주로 건설 최소비용 return하기
 **/

function solution(board) {
    const queue = [];
    const N = board.length;

    //방향
    const directions = [
        [-1, 0], //상
        [1, 0], //하
        [0, -1], //좌
        [0, 1], //우
    ];

    const dist = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Array(4).fill(Infinity))
    );

    //[row, col, cost, direction]
    //처음 시작점 [0,0]에서의 이동 처리 => 오른쪽으로 가거나 아래로 가거나 두 경우만 있음
    if (board[0][1] === 0) {
        queue.push([0, 1, 100, 3]); //오른쪽 이동
        dist[0][1][3] = 100;
    }

    if (board[1][0] === 0) {
        queue.push([1, 0, 100, 1]); //아래쪽 이동
        dist[1][0][1] = 100;
    }

    let head = 0;
    while (queue.length > head) {
        const [r, c, currentCost, prevDir] = queue[head++];

        for (let i = 0; i < 4; i++) {
            const nr = r + directions[i][0];
            const nc = c + directions[i][1];

            if (nr < 0 || nr >= N || nc < 0 || nc >= N || board[nr][nc] === 1)
                continue;

            const nextCost = currentCost + (prevDir === i ? 100 : 600);

            if (nextCost < dist[nr][nc][i]) {
                dist[nr][nc][i] = nextCost;
                queue.push([nr, nc, nextCost, i]);
            }
        }
    }

    let answer = Infinity;

    for (const cost of dist[N - 1][N - 1]) {
        if (cost < answer) answer = cost;
    }

    return answer;
}
