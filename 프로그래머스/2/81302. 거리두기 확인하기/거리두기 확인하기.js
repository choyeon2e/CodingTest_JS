/**
 * P인 것들끼리 맨해튼거리 2 이하인 것들을 모음(queue)
 * 없다면 모두 만족하고 있는 것이고(result=1) 있다면
 * => 그 사이에 X(파티션)가 있는지 확인. 있으면 queue에서 제거
 * => 다 확인했을 때 queue에 원소가 남아있으면 result=0
 * => queue가 비어있으면 result=1
 **/

function isBlocked(place, [r1, c1], [r2, c2]) {
    const dist = Math.abs(r1 - r2) + Math.abs(c1 - c2);

    if (dist === 1) return false; //딱 붙어있는 경우 => 파티션x

    //같은 행
    if (r1 === r2) {
        if (place[r1][(c1 + c2) / 2] === "X") return true;
        return false;
    }

    //같은 열
    if (c1 === c2) {
        if (place[(r1 + r2) / 2][c1] === "X") return true;
        return false;
    }

    return place[r1][c2] === "X" && place[r2][c1] === "X"; //대각선
}

function check(place) {
    const people = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (place[i][j] === "P") people.push([i, j]);
        }
    }

    let queue = []; //맨해튼 거리 2 이상인 쌍 모으기
    for (let i = 0; i < people.length; i++) {
        for (let j = i + 1; j < people.length; j++) {
            const [r1, c1] = people[i];
            const [r2, c2] = people[j];

            if (Math.abs(r1 - r2) + Math.abs(c1 - c2) <= 2) {
                queue.push([people[i], people[j]]);
            }
        }
    }
    queue = queue.filter(([p1, p2]) => !isBlocked(place, p1, p2));
    return queue.length === 0 ? 1 : 0;
}

function solution(places) {
    const answer = [];
    for (const place of places) {
        answer.push(check(place));
    }
    return answer;
}
