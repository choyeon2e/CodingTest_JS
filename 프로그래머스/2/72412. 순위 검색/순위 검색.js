/**
 * [조건]을 만족하는 사람 중 코딩테스트를 X점 이상 받은사람은 몇명?
 **/

function make_keys(lang, job, career, food) {
    const keys = [];

    for (const a of [lang, "-"]) {
        for (const b of [job, "-"]) {
            for (const c of [career, "-"]) {
                for (const d of [food, "-"]) {
                    keys.push(`${a} ${b} ${c} ${d}`);
                }
            }
        }
    }
    return keys;
}

function parse_query(q) {
    const [lang, job, career, rest] = q.split(" and ");
    const [food, score] = rest.split(" ");

    return {
        key: `${lang} ${job} ${career} ${food}`,
        score: Number(score),
    };
}

function count_score(scores, x) {
    let left = 0;
    let right = scores.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (scores[mid] >= x) right = mid;
        else left = mid + 1;
    }

    return scores.length - left;
}

function solution(info, query) {
    const drawers = {};
    const answer = [];

    for (const inf of info) {
        const [lang, job, career, food, score] = inf.split(" ");

        for (const key of make_keys(lang, job, career, food)) {
            if (!drawers[key]) drawers[key] = [];
            drawers[key].push(Number(score));
        }
    }

    for (const key in drawers) {
        drawers[key].sort((a, b) => a - b);
    }

    for (const q of query) {
        const parsed = parse_query(q);
        const key = parsed.key;
        const score = parsed.score;
        let scores = drawers[key];

        if (!scores) {
            scores = [];
        }

        const count = count_score(scores, score);
        answer.push(count);
    }
    return answer;
}
