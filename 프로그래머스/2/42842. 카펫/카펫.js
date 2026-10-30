/**
 * 중앙이 노란색으로 칠해져있고 가장 테두리 1줄은 갈색으로 칠해짐
 *
 * solve)
 * brown + yellow = 직사각형의 넓이
 **/

function solution(brown, yellow) {
    const total = brown + yellow;

    for (let h = 3; h * h <= total; h++) {
        if (total % h !== 0) continue;
        const w = total / h;

        if ((w - 2) * (h - 2) === yellow) {
            return [w, h];
        }
    }
}
