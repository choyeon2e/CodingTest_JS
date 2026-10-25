/**
 * 어피치가 우승하는 쪽으로 규칙
 * 1. 어피치 n발 쏘고 라이언이 n발 쏨
 * 2. 점수 계산
 *   - 같은 점수를 맞췄으면 더 많은 화살을 맞힌 선수가 k점 획득. (여러발 맞혀도 k점만 가져감)
 *   - 둘이 같은 개수의 화살 맞히면 어피치가 k점 획득
 *   - 둘다 하나도 못맞추면 아무도 k점 획득 x
 * 3. 최종점수 높은 선수가 우승 (같을 경우 어피치가 우승)
 *
 * 라이언이 가장 큰 점수차로 우승하기위해 n발을 어디에 맞혀야하는지 10~0점까지 정수배열에 리턴
 * 라이언이 우승할 수 없으면(지거나 비김) [-1] 리턴
 * 우승방법이 여러개면 가장 낮은 점수를 더 많이 맞힌 경우로 return
 *
 * solve)
 * 라이언의 선택지: 어피치보다 한발 더 쏘기 or k점 포기 (0발)
 **/

function get_diff(ryan, info) {
    let r = 0; // r=라이언 총점
    let a = 0; // a=어피치 총점

    for (let i = 0; i < 11; i++) {
        const k = 10 - i; // 배열의 i번째 원소는 k점에 쏜 개수 의미하므로

        if (ryan[i] > info[i]) r += k;
        else if (info[i] > 0) a += k;
    }

    return r - a; // 라이언 총점 - 어피치 총점
}

function is_smaller(current, answer) {
    // 0점~10점 순서로
    for (let i = 10; i >= 0; i--) {
        // 현재와 지금 기록된 result.answer의 화살 개수가 다르면
        if (current[i] !== answer[i]) {
            if (current[i] > answer[i]) {
                return true;
            } else {
                return false;
            }
        }
    }
    return false; // 0~10점 11개 모두 같으면 -> false
}

function ryan_shooting(idx, left, ryan, info, result) {
    if (idx === 11) {
        ryan[10] += left;
        const diff = get_diff(ryan, info);

        if (
            diff > 0 &&
            (diff > result.maxDiff ||
                (diff === result.maxDiff && is_smaller(ryan, result.answer)))
        ) {
            result.maxDiff = diff;
            result.answer = [...ryan];
        }
        ryan[10] -= left;
        return;
    }

    // 어피치보다 한발 더 쏴서 점수 획득하기
    if (left > info[idx]) {
        ryan[idx] = info[idx] + 1;
        ryan_shooting(idx + 1, left - ryan[idx], ryan, info, result);
        ryan[idx] = 0;
    }

    // 점수 포기 (0발 쏨)
    ryan_shooting(idx + 1, left, ryan, info, result);
}

function solution(n, info) {
    // info: 어피치 슈팅정보
    const result = { answer: [-1], maxDiff: 0 };
    ryan_shooting(0, n, new Array(11).fill(0), info, result);
    return result.answer;
}
