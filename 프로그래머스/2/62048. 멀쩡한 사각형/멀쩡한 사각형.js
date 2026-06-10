/**
 * 가로 길이 Wcm, 세로 길이 Hcm
 * 모든 격자칸은 1x1 크기
 * 현재 대각선 꼭지점 2개를 잇는 방향으로 잘려서 크기가 같은 직각삼각형 2개로 나뉨
 *
 * 원래 종이의 가로, 세로 방향에 평행하게 1cmx1cm 크기로 잘라
 * 사용할 수 있는 만큼만 사용
 *
 * 사용할 수 있는 정사각형의 개수 = ?
 **/

function solution(w, h) {
    const getGCD = (a, b) => {
        while (b !== 0) {
            let r = a % b;
            a = b;
            b = r;
        }
        return a;
    };

    const gcd = getGCD(w, h);

    return w * h - (w + h - gcd);
}
