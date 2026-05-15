//최대공약수(유클리드 호제법)
const getGCD = (a, b) => {
    while (b !== 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
};

//배열 전체 최대공약수 구하기
const getArrayGCD = (arr) => {
    let res = arr[0];
    for (let i = 1; i < arr.length; i++) {
        res = getGCD(res, arr[i]);
        if (res === 1) break;
    }
    return res;
};

function solution(arrayA, arrayB) {
    const gcdA = getArrayGCD(arrayA);
    const gcdB = getArrayGCD(arrayB);

    let answer = 0;

    if (gcdA > 1) {
        if (arrayB.every((num) => num % gcdA !== 0)) {
            answer = Math.max(answer, gcdA);
        }
    }

    if (gcdB > 1) {
        if (arrayA.every((num) => num % gcdB !== 0)) {
            answer = Math.max(answer, gcdB);
        }
    }
    return answer;
}
