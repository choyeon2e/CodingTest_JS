function solution(keyinput, board) {
    let x = 0;
    let y = 0;

    //이동가능한 경계값
    const maxX = Math.floor(board[0] / 2);
    const maxY = Math.floor(board[1] / 2);

    const moves = {
        up: [0, 1],
        down: [0, -1],
        left: [-1, 0],
        right: [1, 0],
    };

    for (const key of keyinput) {
        const [dx, dy] = moves[key];

        //이동했을 때의 값 (임시)
        const nx = x + dx;
        const ny = y + dy;

        // 임시값이 경계값 안에 있는지 확인
        if (Math.abs(nx) <= maxX && Math.abs(ny) <= maxY) {
            x = nx;
            y = ny;
        }
    }

    return [x, y];
}
