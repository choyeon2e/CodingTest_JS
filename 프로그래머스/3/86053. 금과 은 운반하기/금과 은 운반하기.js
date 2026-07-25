/**
 * 도시를 짓기 위해 금 a kg와 은 b kg 전달 필요
 *
 * i번 도시에는 금 g[i] kg, 은 s[i] kg, 트럭 한대가 있음
 * i번 도시 트럭은 새 도시를 짓는 건설 장소와 i번 도시만 왕복 가능
 * 편도 이동에 t[i] 시간이 걸림, 최대 w[i] kg 광물 운반 가능 (금,은 동시 운반 가능)
 *
 * 금, 은을 전달할 수 있는 가장 빠른 시간 = ?
 **/

function solution(a, b, g, s, w, t) {
    let left = 0;
    let right = 2 * 10 ** 9 * (2 * 10 ** 9); // 금 왕복시간 최대 * 은 왕복시간 최대
    let answer = right;

    const n = g.length;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        let totalGold = 0;
        let totalSilver = 0;
        let totalWeight = 0;

        for (let i = 0; i < n; i++) {
            const gold = g[i];
            const silver = s[i];
            const weight = w[i];
            const time = t[i];

            const moveCount = Math.floor((mid + time) / (2 * time));
            const max = moveCount * weight;

            totalGold += Math.min(gold, max);
            totalSilver += Math.min(silver, max);
            totalWeight += Math.min(gold + silver, max);
        }

        if (totalGold >= a && totalSilver >= b && totalWeight >= a + b) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return answer;
}
