/**
 * 입국심사
 * 심사관마다 심사하는데 걸리는 시간이 다름
 *
 * 처음에는 심사대 모두 비어있고 한 심사대에 한명만 심사 가능
 * 가장 앞에 서있는 사람은 비어있는 심사대로 가서 받기 가능
 *
 * 심사 받는데에 걸리는 시간 최소로
 **/

function solution(n, times) {
    times.sort((a, b) => a - b);

    let left = 1;
    let right = times[times.length - 1] * n; //제일 느린 심사관이 다 검사할때 시간
    let answer = right;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let total = 0;

        for (let time of times) {
            total += Math.floor(mid / time);
        }

        if (total >= n) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return answer;
}
