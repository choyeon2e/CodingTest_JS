/**
 * 택시비 아끼기위한 합승
 * 간선의 숫자: 두지점 사이 예상 택시요금. 이동방향과 무관
 * 최저예상택시요금 구하기
 * 합승 안하고 각자 이동하는 경우의 요금이 더 낮으면 합승 안해도됨
 **/

function solution(n, s, a, b, fares) {
    const graph = Array.from({ length: n + 1 }, () =>
        Array(n + 1).fill(Infinity)
    );

    for (let i = 1; i <= n; i++) graph[i][i] = 0;

    for (const [u, v, w] of fares) {
        graph[u][v] = w;
        graph[v][u] = w;
    }
    //플로이드워셜
    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (graph[i][j] > graph[i][k] + graph[k][j]) {
                    graph[i][j] = graph[i][k] + graph[k][j];
                }
            }
        }
    }

    let min = graph[s][a] + graph[s][b]; //합승안하고 각자 가는 경우

    for (let i = 1; i <= n; i++) {
        const curr = graph[s][i] + graph[i][a] + graph[i][b];
        min = Math.min(min, curr);
    }
    return min;
}
