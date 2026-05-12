/**
 * 권투 대회: 1대1 방식, A가 B보다 실력 좋으면 항상 이김
 * 몇몇 경기 결과를 분실해서 정확히 순위를 매길 수 없음
 *
 * 선수의 수 n, 경기결과 2차원배열 results 주어짐
 * 정확하게 순위를 매길 수 있는 선수의 수를 return
 *
 **/

function solution(n, results) {
    const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));

    for (const [winner, loser] of results) {
        graph[winner][loser] = true;
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            for (let k = 1; k <= n; k++) {
                if (graph[j][i] && graph[i][k]) {
                    graph[j][k] = true;
                }
            }
        }
    }

    let answer = 0;

    for (let i = 1; i <= n; i++) {
        let count = 0;
        for (let j = 1; j <= n; j++) {
            if (graph[i][j] || graph[j][i]) {
                count++;
            }
        }
        if (count === n - 1) answer++;
    }
    return answer;
}
