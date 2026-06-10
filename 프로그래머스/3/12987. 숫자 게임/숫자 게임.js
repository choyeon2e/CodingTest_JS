/**
 * 2xN명의 사원들(짝수명)은 N명씨 두팀으로 나눠 숫자게임 (A,B팀)
 *
 * 모든 사원이 무작위로 자연수를 하나씩 부여받음
 * 딱 한번씩 경기를 함
 * 팀에서 한사람씩 수를 공개. 숫자가 큰 쪽이 이기고 승점 1점 얻음
 * 숫자가 같으면 누구도 승점을 얻지 x
 *
 * A팀의 출전순서를 알아서 B팀은 최종승점을 가장 크게하는 순서로 정함
 * 이때 B팀이 얻는 승점은?
 *
 * A배열은 출전 순서대로 나열되어있고 i번째 원소가 B팀 i번 팀원이 부여받은 수를 의미함
 * B 팀원들이 얻을 수 있는 최대 승점 리턴
 **/

function solution(A, B) {
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);

    let answer = 0;
    let bIdx = 0;

    for (let i = 0; i < A.length; i++) {
        while (bIdx < B.length && B[bIdx] <= A[i]) {
            bIdx++;
        }

        if (A[i] < B[bIdx]) {
            answer++;
            bIdx++;
        } else {
            break;
        }
    }
    return answer;
}
