/**
 * 특정 프로세스가 몇번째로 실행되는지 알아내기
 * 1. 대기 큐에서 대기중인 프로세스 하나 꺼내기
 * 2. 대기중인 프로세스 중 우선순위 더 높은거 있으면 방금꺼낸 프로세스는 다시 넣기
 * 3. 더높은 프로세스 없다면 방금꺼낸 프로세스를 실행
 *   3.1 한번 실행한 프로세스는 다시 큐에 넣지않고 종료
 **/

function solution(priorities, location) {
    const ids = priorities.map((p, i) => i);
    let count = 0;

    while (true) {
        const first = priorities.shift();
        const first_id = ids.shift();
        const max = Math.max(...priorities);

        if (first < max) {
            priorities.push(first);
            ids.push(first_id);
        } else {
            count += 1;
            if (first_id === location) {
                return count;
            }
        }
    }
}
