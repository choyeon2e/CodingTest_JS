function solution(i, j, k) {
    let answer = 0;

    for (let h = i; h <= j; h++) {
        const arr = h.toString().split("").map(Number);
        for (let g = 0; g < arr.length; g++) {
            if (arr[g] === k) {
                answer += 1;
            }
        }
    }

    return answer;
}
