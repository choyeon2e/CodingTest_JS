//소수인지 판별 함수
function isPrime(num) {
    if (num <= 1) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }

    return true;
}

function solution(n, k) {
    const kNum = n.toString(k); //n을 k진수로 변환
    const candidates = kNum.split("0").map(Number);
    let count = 0;

    for (const num of candidates) {
        if (isPrime(num)) {
            count++;
        }
    }
    return count;
}
