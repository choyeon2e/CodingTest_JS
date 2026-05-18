function solution(distance, rocks, n) {
    let answer = 0;
    rocks.sort((a, b) => a - b);

    let left = 1;
    let right = distance;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        let removed = 0;
        let prev = 0;

        for (let i = 0; i < rocks.length; i++) {
            if (rocks[i] - prev < mid) {
                //거리 mid 미만: 바위 제거
                removed++;
            } else {
                //거리 mid 이상: 기준점 이동
                prev = rocks[i];
            }
        }

        if (distance - prev < mid) {
            removed++;
        }

        if (removed > n) {
            right = mid - 1;
        } else {
            answer = mid;
            left = mid + 1;
        }
    }
    return answer;
}
