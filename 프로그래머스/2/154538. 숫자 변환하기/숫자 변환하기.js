function solution(x, y, n) {
    if (x === y) return 0;

    //dp[i]: i 만드는 데 필요한 최소 횟수
    const dp = Array(y + 1).fill(Infinity);
    dp[x] = 0;

    for (let i = x; i <= y; i++) {
        //i에 도달할 수 없으면 continue
        if (dp[i] === Infinity) continue;

        if (i + n <= y) {
            dp[i + n] = Math.min(dp[i + n], dp[i] + 1);
        }
        if (i * 2 <= y) {
            dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
        }
        if (i * 3 <= y) {
            dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
        }
    }
    //Infinity면 못만드는거
    return dp[y] === Infinity ? -1 : dp[y];
}
