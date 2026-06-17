/**
 * 숫자를 하나씩 차례대로 말하는 게임
 *
 * 1. 0부터 시작해서 차례대로 말함. 첫번재 사람은 0, 두번째 사람은 1 이런거처럼
 * 2. 10 이상 수는 한자리씩 끊어서 10의 경우 1,0 이런 식으로 말함
 *
 * 이진수부터 십육진법까지 모든 진법으로 게임을 진행
 *
 * 튜브가 말해야하는 숫자를 리턴하기
 **/

function solution(n, t, m, p) {
    let str = "";
    let num = 0;
    let answer = "";

    while (str.length < t * m) {
        str += num.toString(n).toUpperCase();
        num++;
    }

    for (let i = 0; i < t; i++) {
        answer += str[p - 1 + i * m];
    }

    return answer;
}
