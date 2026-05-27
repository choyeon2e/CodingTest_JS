/**
 * 수확한 귤 중 k개를 상자 하나에 담아 판매
 * 귤의 크기는 일정하지않음
 * => 크기별로 분류했을 때 서로 다른 종류의 수를 최소화해야함
 *
 * solve)
 * 귤 크기별로 몇개씩 있는지 세기 => Map
 * 귤 개수 내림차순 정렬 (많은거부터)
 **/

function solution(k, tangerine) {
    const map = new Map();
    let answer = 0;
    let sum = 0;

    for (const t of tangerine) {
        map.set(t, (map.get(t) || 0) + 1);
    }

    const sortTangerine = [...map.values()].sort((a, b) => b - a);

    for (const t of sortTangerine) {
        sum += t;
        answer++;

        if (sum >= k) {
            break;
        }
    }
    return answer;
}
