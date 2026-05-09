//상하좌우
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function bfs(r, c, board, targetValue, n) {
    const block = [];
    const queue = [[r, c]];
    board[r][c] = targetValue === 1 ? 0 : 1;
    block.push([r, c]);

    while (queue.length > 0) {
        const [currR, currC] = queue.shift();
        for (let i = 0; i < 4; i++) {
            const nr = currR + dr[i];
            const nc = currC + dc[i];

            if (
                nr >= 0 &&
                nr < n &&
                nc >= 0 &&
                nc < n &&
                board[nr][nc] === targetValue
            ) {
                board[nr][nc] = targetValue === 1 ? 0 : 1;
                block.push([nr, nc]);
                queue.push([nr, nc]);
            }
        }
    }
    return normalize(block);
}

function normalize(block) {
    const minR = Math.min(...block.map((b) => b[0]));
    const minC = Math.min(...block.map((b) => b[1]));
    return block
        .map(([r, c]) => [r - minR, c - minC])
        .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function rotate(block) {
    let maxR = Math.max(...block.map((b) => b[0]));
    const rotated = block.map(([r, c]) => [c, maxR - r]);
    return normalize(rotated);
}

function solution(game_board, table) {
    const n = game_board.length;
    const blanks = [];
    const puzzles = [];

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (game_board[r][c] === 0)
                blanks.push(bfs(r, c, game_board, 0, n));
            if (table[r][c] === 1) puzzles.push(bfs(r, c, table, 1, n));
        }
    }

    let answer = 0;
    const usedPuzzle = new Array(puzzles.length).fill(false);

    for (const blank of blanks) {
        for (let i = 0; i < puzzles.length; i++) {
            if (usedPuzzle[i]) continue;
            if (blank.length !== puzzles[i].length) continue;

            let match = false;
            let tempPuzzle = puzzles[i];

            for (let r = 0; r < 4; r++) {
                if (JSON.stringify(blank) === JSON.stringify(tempPuzzle)) {
                    match = true;
                    break;
                }
                tempPuzzle = rotate(tempPuzzle);
            }

            if (match) {
                usedPuzzle[i] = true;
                answer += blank.length;
                break;
            }
        }
    }
    return answer;
}
