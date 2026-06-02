function solution(board) {
    let max = 0;
    const row = board.length;
    const col = board[0].length;

    if (row < 2 || col < 2) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (board[i][j] === 1) return 1;
            }
        }
        return 0;
    }

    for (let i = 1; i < row; i++) {
        for (let j = 1; j < col; j++) {
            if (board[i][j] === 1) {
                board[i][j] =
                    Math.min(
                        board[i - 1][j],
                        board[i][j - 1],
                        board[i - 1][j - 1]
                    ) + 1;
                max = Math.max(max, board[i][j]);
            }
        }
    }

    return max * max;
}
