/**
 * 이모티콘 할인행사의 목표
 * 1. 임티플 가입자 최대한 늘림
 * 2. 이모티콘 판매액 최대로
 *
 * 1번 목표 우선, 2번 목표 그다음
 *
 * 할인행사
 * - n명의 사용자에게 m개의 이모티콘 할인판매
 * - 할인율은 이모티콘마다 다를 수 있고 10,20,30,40% 중 하나
 *
 * 사용자들의 이모티콘 구매 or 임티플 가입 기준
 * - 자신의 기준에 따라 일정비율 이상 할인하는 이모티콘 모두 구매
 * - 일정가격이상이 되면 이모티콘 구매 다 취소 후 임티플
 *
 *
 * solve)
 * 이모티콘 최대 7개, 할인율 4가지 -> 4^7 조합 전부 확인 (dfs 백트래킹)
 * 조합 하나가 정해지면 사용자마다 구매액 계산 -> [가입자 수, 판매액]
 * 가입자 수 우선, 같으면 판매액 비교해서 갱신
 **/

const RATES = [10, 20, 30, 40];

function evaluate(users, emoticons, discounts) {
    let plus = 0;
    let sales = 0;

    for (const [ratio, limit] of users) {
        let total = 0;

        for (let i = 0; i < emoticons.length; i++) {
            if (discounts[i] >= ratio) {
                total += (emoticons[i] * (100 - discounts[i])) / 100;
            }
        }

        if (total >= limit) plus++;
        else sales += total;
    }

    return [plus, sales];
}

function check(cur, best) {
    if (cur[0] !== best[0]) return cur[0] > best[0];
    return cur[1] > best[1];
}

function dfs(discounts, users, emoticons, result) {
    if (discounts.length === emoticons.length) {
        const cur = evaluate(users, emoticons, discounts);

        if (check(cur, result)) {
            result[0] = cur[0];
            result[1] = cur[1];
        }

        return;
    }

    for (const rate of RATES) {
        discounts.push(rate);
        dfs(discounts, users, emoticons, result);
        discounts.pop();
    }
}

function solution(users, emoticons) {
    const result = [0, 0]; //[가입자수, 판매액]
    dfs([], users, emoticons, result);
    return result;
}
