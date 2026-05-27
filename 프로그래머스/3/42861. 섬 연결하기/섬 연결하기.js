/**
 * n개의 섬 사이에 다리를 건설하는 비용 주어짐
 * 최소 비용으로 모든 섬이 통행 가능하도록 할때 필요한 최소비용 리턴하기
 *
 * 다리를 여러번 건너도 도달할 수만 있으면 통행 가능한 것
 *
 * cost[i][0], cost[i][1] => 두 섬의 번호
 * cost[i][2] => 두 섬 연결 시 드는 비용
 **/

function solution(n, costs) {
    costs.sort((a, b) => a[2] - b[2]); //가격이 작은것부터

    const connected = new Set([costs[0][0], costs[0][1]]);
    let answer = costs[0][2];

    while (connected.size < n) {
        for (let i = 1; i < costs.length; i++) {
            const [from, to, cost] = costs[i];

            //한쪽만 연결된 경우에 추가
            if (
                (connected.has(from) && !connected.has(to)) ||
                (!connected.has(from) && connected.has(to))
            ) {
                connected.add(from);
                connected.add(to);

                answer += cost;
                break;
            }
        }
    }
    return answer;
}
