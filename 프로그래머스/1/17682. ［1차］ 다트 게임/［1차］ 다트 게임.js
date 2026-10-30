function is_digit(c) {
    return c >= "0" && c <= "9";
}

function checkType(dart) {
    const d = [];
    const idx = [];

    for (let i = 0; i < dart.length; i++) {
        if (is_digit(dart[i]) && !(i > 0 && is_digit(dart[i - 1]))) {
            idx.push(i);
        }
    }

    for (let k = 0; k < idx.length; k++) {
        const start = idx[k];
        let end;

        if (k + 1 < idx.length) {
            end = idx[k + 1];
        } else {
            end = dart.length;
        }
        d.push(dart.slice(start, end));
    }
    return d;
}

//S, D, T
function calc_bonus(bonus) {
    if (bonus === "S") return 1;
    if (bonus === "D") return 2;
    return 3;
}

function solution(dartResult) {
    const darts = checkType(dartResult);
    let answer = 0;
    const scores = [];

    for (let k = 0; k < darts.length; k++) {
        const dart = darts[k];
        let i = 0;
        while (is_digit(dart[i])) i++;

        const score = Number(dart.slice(0, i));
        const bonus = dart[i];
        const option = dart[i + 1];

        scores[k] = score ** calc_bonus(bonus);

        if (option === "*") {
            scores[k] *= 2;
            if (k > 0) scores[k - 1] *= 2;
        } else if (option === "#") {
            scores[k] *= -1;
        }
    }

    for (let l = 0; l < scores.length; l++) {
        answer += scores[l];
    }
    return answer;
}
