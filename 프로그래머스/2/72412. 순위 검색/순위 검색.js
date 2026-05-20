/**
 * 지원서 선택 항목 4가지
 * 1. 개발언어: cpp, java, python
 * 2. 지원직군: backend, frontend
 * 3. 경력구분: junior, senior
 * 4. 소울푸드: chicken, pizza
 *
 * 지원자들의 지원조건을 선택 시 해당 조건에 맞는 지원자의 수를 알려주는 도구 만드는 중
 * [조건]을 만족하는 사람 중 코테 점수 X점 이상 받은 사람은 모두 몇명인가?
 *
 * 지원서의 4가지 정보와 코테 점수를 하나의 문자열로 구성한 배열 info
 * 문의조건이 문자열 형태로 담긴 배열 query
 * => ~ and ~ and ~ 형식, -이면 해당 조건 고려 x 의미
 *
 * 각 문의조건에 해당하는 사람들의 숫자를 순서대로 배열에 담아 return하기
 **/

function binarySearch(scores, score) {
    let low = 0;
    let high = scores.length;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        if (scores[mid] >= score) high = mid;
        else low = mid + 1;
    }

    return scores.length - low;
}

function combine(arr, score, start, map) {
    const key = arr.join("");

    if (map[key]) map[key].push(score);
    else map[key] = [score];

    for (let i = start; i < arr.length; i++) {
        const temp = [...arr];
        temp[i] = "-";
        combine(temp, score, i + 1, map);
    }
}

function manageQuery(query, map) {
    return query.map((q) => {
        const parts = q.replace(/ and /g, " ").split(" ");
        const score = Number(parts.pop());
        const key = parts.join("");
        const scores = map[key];

        if (!scores) return 0;

        return binarySearch(scores, score);
    });
}

function solution(info, query) {
    const map = {};

    info.forEach((item) => {
        const parts = item.split(" ");
        const score = Number(parts.pop());

        combine(parts, score, 0, map);
    });

    for (const key in map) {
        map[key].sort((a, b) => a - b);
    }

    return manageQuery(query, map);
}
