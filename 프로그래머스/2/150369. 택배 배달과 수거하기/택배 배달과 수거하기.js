/**
 * n개의 집에 택배 배달
 * 물류창고 인덱스: 0, i번째 집은 물류창고에서 거리 i만큼 떨어짐
 * 트럭에 최대 cap개의 상자 싣기 가능
 * 물류창고에서 출발해 각 집에 배달, 빈 상자 수거해서 물류창고에 내림
 *
 * 트럭 하나로 모든 배달, 수거 마치고 물류창고로 돌아올 수 있는 최소 이동 거리 = ?
 *
 * solve)
 * 일단 가장 먼 집까지.
 * 가는 길에는 배달만 하고 오는 길에는 수거만
 * 한 번 왕복에 배달 cap개, 수거 cap개를 각각 먼 집부터 처리 가능
 * 끝 집부터 남은 배달량 d, 수거량 p를 누적하고
 * 둘 중 하나라도 남아 있으면 그 집까지 왕복 (둘 다 cap씩 처리)
 **/

function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    let d = 0; //남은 배달 상자
    let p = 0; //남은 수거 상자

    for (let i = n - 1; i >= 0; i--) {
        d += deliveries[i];
        p += pickups[i];

        while (d > 0 || p > 0) {
            d -= cap;
            p -= cap;
            answer += (i + 1) * 2;
        }
    }
    return answer;
}
