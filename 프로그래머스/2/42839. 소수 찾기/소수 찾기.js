function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function dfs(combined, others, set) {
    if (combined.length > 0) {
        set.add(Number(combined));
    }

    for (let i = 0; i < others.length; i++) {
        dfs(
            combined + others[i],
            others.substring(0, i) + others.substring(i + 1),
            set
        );
    }
}

function solution(numbers) {
    const numSet = new Set();

    dfs("", numbers, numSet);

    let answer = 0;

    for (let num of numSet) {
        if (isPrime(num)) {
            answer++;
        }
    }
    return answer;
}
