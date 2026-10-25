/**
 * 01:43
 * 최소 필요 피로도: 던전탐험위해 가지고있어야하는 최소한의 피로도
 * 소모 피로도: 던전탐험 후 소모되는 피로도
 *
 * 현재 피로도 k. 유저가 하루동안 탐험 가능한 최대 던전수 = ?
 *
 * solve)
 * dungeons = [최소필요피로도, 소모피로도]
 * k가 최소필요피로도보다 크거나같아야 탐험 가능 (작으면pass)
 * result += 1 후에는 k -= 소모피로도
 * 탐험 순서에 따라 result가 달라질 수 있음 => 모든 경우를 탐색해보고 max를 리턴해야함
 * ==> dfs
 **/

function dfs(k, dungeons, visited) {
    let max = 0;

    for (let i = 0; i < dungeons.length; i++) {
        if (!visited[i] && k >= dungeons[i][0]) {
            visited[i] = true;

            const result = 1 + dfs(k - dungeons[i][1], dungeons, visited);
            max = Math.max(result, max);

            visited[i] = false;
        }
    }
    return max;
}

function solution(k, dungeons) {
    const visited = Array.from({ length: dungeons.length }, () => false);

    return dfs(k, dungeons, visited);
}
