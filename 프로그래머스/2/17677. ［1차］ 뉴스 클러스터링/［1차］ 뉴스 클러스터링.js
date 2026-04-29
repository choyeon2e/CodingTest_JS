/**
 * 자카드 유사도 출력하기
 *
 * 배열을 두글자씩 끊어서 다중집합의 원소로 만들기.
 * 만약 기타 공백이나 숫자, 특문이 들어있으면 글자쌍을 버리기
 * 대문자, 소문자의 차이는 무시
 * 자카드 유사도: 두 집합의 교집합 크기를 두 집합의 합집합 크기로 나눈 값으로 정의
 * 출력 - 유사도에 65536을 곱하고 소수점 아래를 버리고 정수부만 출력
 **/

function solution(str1, str2) {
    str1 = str1.toUpperCase();
    str2 = str2.toUpperCase();

    const str1_hash = new Map();
    const str2_hash = new Map();

    for (let i = 0; i < str1.length - 1; i++) {
        const pair = str1.substr(i, 2);

        if (/^[a-zA-Z]+$/.test(pair)) {
            str1_hash.set(pair, (str1_hash.get(pair) || 0) + 1);
        }
    }

    for (let i = 0; i < str2.length - 1; i++) {
        const pair = str2.substr(i, 2);

        if (/^[a-zA-Z]+$/.test(pair)) {
            str2_hash.set(pair, (str2_hash.get(pair) || 0) + 1);
        }
    }

    const str_set = new Set([...str1_hash.keys(), ...str2_hash.keys()]);

    let intersection = 0;
    let union = 0;
    let answer = 0;

    for (const key of str_set.keys()) {
        const count1 = str1_hash.get(key) || 0;
        const count2 = str2_hash.get(key) || 0;

        intersection += Math.min(count1, count2);
        union += Math.max(count1, count2);
    }

    if (union === 0 && intersection === 0) {
        answer = 65536;
    } else {
        answer = Math.floor((intersection / union) * 65536);
    }
    return answer;
}
