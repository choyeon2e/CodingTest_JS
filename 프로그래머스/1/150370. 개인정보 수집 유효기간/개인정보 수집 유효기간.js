/**
 * 1~n번으로 분류되는 개인정보 n개
 * 각 약관마다 개인정보 보관 유효기간이 정해져있음
 * 오늘 날짜로 파기해야할 개인정보 번호들 = ?
 *
 * 모든 달은 28일까지 존재
 **/

function matchType(terms, map) {
    for (const term of terms) {
        const [type, expireM] = term.split(" ");
        map.set(type, Number(expireM));
    }
}

function calcExpireDate(termsMap, privacies) {
    const expireDates = [];
    for (const privacy of privacies) {
        const [date, type] = privacy.split(" ");
        const [year, month, day] = date.split(".").map(Number);

        const expire = termsMap.get(type); //type종류의 유효기간
        let ex_d, ex_m, ex_y;

        if (day === 1) {
            ex_d = 28;
            ex_m = month + expire - 1;
            ex_y = year;
            while (ex_m > 12) {
                ex_m -= 12;
                ex_y += 1;
            }
        } else {
            ex_d = day - 1;
            ex_m = month + expire;
            ex_y = year;
            while (ex_m > 12) {
                ex_m -= 12;
                ex_y += 1;
            }
        }
        expireDates.push(`${ex_y}.${ex_m}.${ex_d}`);
    }
    return expireDates;
}

function checkExpireToday(expireDates, today) {
    const [ty, tm, td] = today.split(".").map(Number);
    const result = [];

    for (let i = 0; i < expireDates.length; i++) {
        const [ey, em, ed] = expireDates[i].split(".").map(Number);

        if (ey < ty) {
            result.push(i + 1);
        } else if (ey === ty && em < tm) {
            result.push(i + 1);
        } else if (ey === ty && em === tm && ed < td) {
            result.push(i + 1);
        } else {
            continue;
        }
    }

    return result;
}

function solution(today, terms, privacies) {
    const terms_map = new Map();
    matchType(terms, terms_map);
    const expireDates = calcExpireDate(terms_map, privacies);

    return checkExpireToday(expireDates, today);
}
