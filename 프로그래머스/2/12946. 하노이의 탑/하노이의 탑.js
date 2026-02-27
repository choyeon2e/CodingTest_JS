/**
 * 한번에 하나의 원판만 이동
 * 큰 원판이 작은 원판 위에 있으면 x
 * 문제: 1,2,3번의 세 기둥. 1번에 있는 n개의 원판을 모두 3번으로 옮기기
 * sol
 * 1. 1번의 n-1개 원판을 2번으로 이동
 * 2. 1번에 남은 제일 큰 원판을 3번으로 이동
 * 3. 2번의 n-1개 원판을 3번으로 이동
 */

function Hanoi(n, arr, n1, n2, n3) {
    if (n === 1) {
        arr.push([n1, n3]);
        return;
    } else {
        Hanoi(n - 1, arr, n1, n3, n2);
        arr.push([n1, n3]);
        Hanoi(n - 1, arr, n2, n1, n3);
    }
}

function solution(n) {
    const answer = [];
    Hanoi(n, answer, 1, 2, 3);
    return answer;
}
