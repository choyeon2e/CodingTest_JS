/**
 * 내가 i행의 0번 열을 밟았다면 i-1행에서는 1,2,3번 열 중 가장 큰 점수의 열을 밟아야함
 * land[i][j] = i번째 행의 j열을 밟았을 때 얻을 수 있는 최대 점수
 */

function solution(land) {
    const n = land.length;

    for (let i = 1; i < n; i++) {
        // 0번 열을 밟을 때: 이전 행의 1, 2, 3번 중 최대값 + 현재 값
        land[i][0] += Math.max(land[i - 1][1], land[i - 1][2], land[i - 1][3]);

        // 1번 열을 밟을 때: 이전 행의 0, 2, 3번 중 최대값 + 현재 값
        land[i][1] += Math.max(land[i - 1][0], land[i - 1][2], land[i - 1][3]);

        // 2번 열을 밟을 때: 이전 행의 0, 1, 3번 중 최대값 + 현재 값
        land[i][2] += Math.max(land[i - 1][0], land[i - 1][1], land[i - 1][3]);

        // 3번 열을 밟을 때: 이전 행의 0, 1, 2번 중 최대값 + 현재 값
        land[i][3] += Math.max(land[i - 1][0], land[i - 1][1], land[i - 1][2]);
    }

    return Math.max(...land[n - 1]);
}
