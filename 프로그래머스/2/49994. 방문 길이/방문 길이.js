/**
 * 시작점: (0,0)
 * 경계: (-5,5), (-5,-5), (5,5), (5,-5)
 *
 * 명령어 dirs: U, D, R, L (위, 아래, 오른쪽, 왼쪽)
 * 이미 지났던 길을 제외하고 캐릭터가 처음 걸어본 길의 길이 = ?
 *
 * sol)
 * 중복제거: Set 이용
 **/

const moves = {
    U: [0, 1], // 위
    D: [0, -1], // 아래
    R: [1, 0], // 오른쪽
    L: [-1, 0], // 왼쪽
};

function solution(dirs) {
    let answer = 0;
    let currentX = 0;
    let currentY = 0;
    const visited = new Set();

    for (const dir of dirs) {
        const [dx, dy] = moves[dir];
        const nx = dx + currentX;
        const ny = dy + currentY;

        if (nx < -5 || nx > 5 || ny < -5 || ny > 5) {
            continue;
        }

        const path1 = `${currentX},${currentY}->${nx},${ny}`;
        const path2 = `${nx},${ny}->${currentX},${currentY}`;

        visited.add(path1);
        visited.add(path2);

        currentX = nx;
        currentY = ny;
    }
    return visited.size / 2;
}
