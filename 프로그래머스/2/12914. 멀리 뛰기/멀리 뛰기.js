/**
 * 효진이는 한번에 1칸, or 2칸을 뛸 수 있음
 * 전체 칸의 수가 주어질때 효진이가 끝에 도달하는 방법 몇가지인지 알아내 1234567 나눈 나머지 리턴
 **/

function solution(n) {
    const dp = new Array(n).fill(0);
    dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % 1234567;
    }

    return dp[n];
}
