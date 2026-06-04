function solution(want, number, discount) {
    let answer = 0;

    for (let i = 0; i <= discount.length - 10; i++) {
        const currentSlice = discount.slice(i, i + 10);
        
        const isMatch = want.every((item, index) => {
            const count = currentSlice.filter(e => e === item).length;
            return count >= number[index];
        });
        
        if (isMatch) answer++;
    }
    return answer;
}