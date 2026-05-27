function solution(n, lost, reserve) {
    let rReserve = reserve
        .filter((r) => !lost.includes(r))
        .sort((a, b) => a - b);

    let rLost = lost.filter((l) => !reserve.includes(l)).sort((a, b) => a - b);

    let answer = n - rLost.length;

    for (let r of rReserve) {
        let frontI = rLost.indexOf(r - 1);
        if (frontI !== -1) {
            rLost.splice(frontI, 1);
            answer++;
            continue;
        }

        let backI = rLost.indexOf(r + 1);
        if (backI !== -1) {
            rLost.splice(backI, 1);
            answer++;
        }
    }
    return answer;
}
