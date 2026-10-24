function solution(want, number, discount) {
    const memo = {};
    let result = 0;

    for (let day = 0; day < discount.length; day++) {
        memo[discount[day]] = (memo[discount[day]] || 0) + 1;

        if (day >= 10) {
            memo[discount[day - 10]] -= 1;
        }

        if (day >= 9) {
            let ok = true;

            for (let i = 0; i < want.length; i++) {
                if (memo[want[i]] !== number[i]) {
                    ok = false;
                    break;
                }
            }

            if (ok) result += 1;
        }
    }

    return result;
}
