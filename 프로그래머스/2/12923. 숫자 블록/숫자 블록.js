function getBlockNumber(num) {
    if (num === 1) return 0;
    let maxDivisor = 1;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        //효율을 위해 X의 제곱근까지
        if (num % i === 0) {
            if (num / i <= 10000000) {
                return num / i;
            }
            maxDivisor = i;
        }
    }
    return maxDivisor;
}

function solution(begin, end) {
    const result = [];

    for (let i = begin; i <= end; i++) {
        result.push(getBlockNumber(i));
    }

    return result;
}
