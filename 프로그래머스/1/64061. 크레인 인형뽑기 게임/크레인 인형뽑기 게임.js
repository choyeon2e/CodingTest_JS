/**
 * NxN 정사각 격자. 각 칸: 비어있거나 인형이 있음
 * 인형은 격자 가장 아래칸부터 쌓여있음
 * 크레인으로 가장 위 인형 집어올리기 가능 -> 바구니 가장 아래부터 쌓임
 * 같은 모양 인형 두개가 바구니에 연속되면 두 인형은 바구니에서 사라짐 (pop 두번)
 *
 * 인형이 없는 곳에 크레인하면 아무일도 x
 * 연속되어 사라진 인형개수 return
 **/

function put_dolls(board, new_board, N) {
    for (let r = N - 1; r >= 0; r--) {
        for (let c = 0; c < N; c++) {
            if (board[r][c] !== 0) new_board[c].push(board[r][c]);
        }
    }
}

function moving_dolls(board, moves, bag) {
    let result = 0;

    for (let i = 0; i < moves.length; i++) {
        if (board[moves[i] - 1].length === 0) {
            continue;
        } else {
            bag.push(board[moves[i] - 1].pop());
            if (bag.length === 1) {
                continue;
            } else {
                const a = bag[bag.length - 1];
                const b = bag[bag.length - 2];

                if (a === b) {
                    bag.pop();
                    bag.pop();
                    result += 2;
                }
            }
        }
    }
    return result;
}

function solution(board, moves) {
    const N = board.length;
    const new_board = Array.from({ length: N }, () => []);
    const bag = [];

    put_dolls(board, new_board, N);
    const result = moving_dolls(new_board, moves, bag);

    return result;
}
