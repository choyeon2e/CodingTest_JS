/**
 * 특정 프로세스가 몇번째로 실행되는지 알아내기
 * 1. 대기 큐에서 대기중인 프로세스 하나 꺼내기
 * 2. 대기중인 프로세스 중 우선순위 더 높은거 있으면 방금꺼낸 프로세스는 다시 넣기
 * 3. 더높은 프로세스 없다면 방금꺼낸 프로세스를 실행
 *   3.1 한번 실행한 프로세스는 다시 큐에 넣지않고 종료
 **/

function solution(priorities, location) {
    const idx_map = new Map();
    let answer = 0; //프로세스 실행횟수(순서)

    for (let i = 0; i < priorities.length; i++) {
        idx_map.set(i, priorities[i]);
    }

    while (idx_map.size > 0) {
        let first_i, first_p;

        for (const [i, p] of idx_map) {
            first_i = i;
            first_p = p;
            break;
        }

        idx_map.delete(first_i);

        let higher = false;
        for (const [i, p] of idx_map) {
            if (p > first_p) {
                higher = true;
            }
        }

        if (higher) {
            //우선순위 더높은게 있으면
            idx_map.set(first_i, first_p);
        } else {
            answer++;
            if (first_i === location) {
                return answer;
            }
        }
    }
}
