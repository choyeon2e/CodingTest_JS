/**
 * n명이 입국심사 - 각 심사관마다 심사 시간이 다름
 * 한 심사대에서는 한명만 동시심사 가능
 * 가장 앞 사람은 비어있는 심사대로 가서 심사 받을 수 있지만
 * 더 빨리 끝나는 심사대 있으면 거기서 심사 받기도 가능
 *
 * 모든 사람의 심사 소요시간을 최소로. 모든사람의 심사소요시간의 최솟값을 return
 *
 * solve)
 * times.length가 심사대 개수.
 * T초 내에 n명의 사람을 심사 가능한가 판단 -> 이분탐색으로 범위 줄여가면서 구하기
 * 초기 right는 가능한 가장 큰 값인 제일 오래걸리는 심사관이 n명을 심사하는 시간으로
 **/

function count_people(times, time, n) {
    let total = 0;

    for (const t of times) {
        total += Math.floor(time / t);
        if (total >= n) break;
    }

    return total;
}

function binarySearch(n, times) {
    let left = 1;
    let right = Math.max(...times) * n;
    let answer = right;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (count_people(times, mid, n) >= n) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return answer;
}

function solution(n, times) {
    return binarySearch(n, times);
}
