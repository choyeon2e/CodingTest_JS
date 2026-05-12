/**
 * 아이템을 줍기 위해 이동할 때의 가장 짧은 거리를 리턴하기
 *
 * 지형은 직사각형이 겹쳐진 형태. 그 지형의 가장 바깥쪽 테두리를 따라 이동함
 * 좌표값은 1 이상 50 이하
 *
 **/

function solution(rectangle, characterX, characterY, itemX, itemY) {
    const field = Array.from({ length: 102 }, () => Array(102).fill(0));

    rectangle.forEach(([x1, y1, x2, y2]) => {
        //모든 좌표 2배로
        x1 *= 2;
        y1 *= 2;
        x2 *= 2;
        y2 *= 2;

        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                if (i === x1 || i === x2 || j === y1 || j === y2) {
                    //테두리일 때: 이미 다른 사각형의 내부가 아닐 때만 1
                    if (field[i][j] !== 2) field[i][j] = 1;
                } else {
                    //내부일 때: 무조건 2
                    field[i][j] = 2;
                }
            }
        }
    });

    const startX = characterX * 2;
    const startY = characterY * 2;
    const targetX = itemX * 2;
    const targetY = itemY * 2;

    //상하좌우
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    const queue = [[startX, startY, 0]];
    field[startX][startY] = 0;

    let head = 0;
    while (head < queue.length) {
        const [r, c, dist] = queue[head++];

        if (r === targetX && c === targetY) return dist / 2; //나누기 2 해줘야함

        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            //지도를 벗어나지 않으면서 테두리인 경우만 이동
            if (
                nr >= 0 &&
                nr < 102 &&
                nc >= 0 &&
                nc < 102 &&
                field[nr][nc] === 1
            ) {
                field[nr][nc] = 0;
                queue.push([nr, nc, dist + 1]);
            }
        }
    }
}
