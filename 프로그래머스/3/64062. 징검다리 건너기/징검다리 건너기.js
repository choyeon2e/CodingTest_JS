/**
 * 징검다리 건너는 규칙
 * 1. 일렬로 놓여있고 숫자가 적혀있으며 밟을때마다 1씩 줄어들음
 * 2. 숫자가 0이 되면 더 밟을 수 없음. 이때는 그다음 디딤돌로 한번에 여러칸(k) 건너뛸수있음
 * 3. 밟을 수 있는 디딤돌이 여러개면 무조건 가장 가까운 디딤돌로만 건너뜀
 *
 * 개울 왼쪽에서 시작해서 오른쪽에 도착해야 건넌 것으로 인정
 * 한명씩 건너야하고 한명이 다 건너고 다음사람이 건너야함
 *
 * 최대 몇명까지 징검다리를 건널 수 있는지 return
 **/

function crossStones(stones, k, mid) {
    let count = 0;

    for (let i = 0; i < stones.length; i++) {
        if (stones[i] < mid) {
            count++;
            if (count >= k) return false;
        } else {
            count = 0;
        }
    }

    return true;
}

function solution(stones, k) {
    let left = 1;
    let right = 200000000;
    let answer = 0;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (crossStones(stones, k, mid)) {
            //mid명이 건널 수 있으면 answer로 일단 기록
            answer = mid;
            left = mid + 1;
        } else {
            //건널 수 없는 경우
            right = mid - 1;
        }
    }
    return answer;
}
