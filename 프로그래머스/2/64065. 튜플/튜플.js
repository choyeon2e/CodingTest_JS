/**
 * 튜플: 순서가 있는 수량있는 요소들의 모음
 * 1. 중복 가능
 * 2. 원소에 순서가 있고 순서가 다르면 서로 다른 튜플
 * 3. 원소의 개수는 유한함.
 *
 * n-튜플: n개의 요소들을 가진 튜플
 * 중복되는 원소가 없는 튜플의 경우 부분집합처럼 표현할 수 있음
 * s가 표현하는 튜플을 리턴하기
 **/

function solution(s) {
    const answer = [];
    const trimS = s.slice(2, -2).split("},{");
    const arr = trimS.map((str) => str.split(",").map(Number));

    arr.sort((a, b) => a.length - b.length);
    const visited = new Set();

    for (const str of arr) {
        // 정렬은 됐으니까 처음보는 숫자 추가 => 중복제거 필요해서 Set 사용
        for (const num of str) {
            if (!visited.has(num)) {
                visited.add(num);
                answer.push(num);
            }
        }
    }
    return answer;
}
