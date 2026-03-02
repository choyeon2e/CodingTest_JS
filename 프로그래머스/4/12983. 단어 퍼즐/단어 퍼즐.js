function solution(strs, target) {
    const n = target.length;
    const dp = Array(n + 1).fill(Infinity);
    const wordSet = new Set(strs); 

    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= 5; j++) {
            if (i - j < 0) break;

            const sub = target.substring(i - j, i);
            if (wordSet.has(sub)) {
                dp[i] = Math.min(dp[i], dp[i - j] + 1);
            }
        }
    }

    return dp[n] === Infinity ? -1 : dp[n];
}