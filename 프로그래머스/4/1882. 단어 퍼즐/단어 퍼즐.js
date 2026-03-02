function solution(strs, target) {
    const n = target.length;
    const dp = Array(n + 1).fill(Infinity);
    const wordSet = new Set(strs);

    dp[0] = 0; //아무글자도 없을 때 (초기값)

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= 5; j++) {
            if (i - j < 0) break;

            const sub = target.substring(i - j, i); // 현재 위치에서 뒤로 j만큼 자른 글자

            if (wordSet.has(sub)) {
                dp[i] = Math.min(dp[i], dp[i - j] + 1);
            }
        }
    }

    return dp[n] === Infinity ? -1 : dp[n];
}
