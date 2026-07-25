/**
 * 구명보트는 최대 2명씩 탑승 가능. 무게제한 존재
 * 구명보트를 최대한 적게 사용해서 모든 사람 구출하려고함
 **/

function solution(people, limit) {
    people.sort((a, b) => a - b);
    let left = 0;
    let right = people.length - 1;
    let answer = 0;

    while (left <= right) {
        if (people[left] + people[right] <= limit) {
            left++;
        }

        right--;
        answer++;
    }
    return answer;
}
