function solution(sequence, k) {
    let answer = [0, sequence.length - 1]; 
    let left = 0;
    let right = 0;
    let sum = sequence[0];
    let minLength = sequence.length + 1;

    while (right < sequence.length) {
        if (sum < k) {
            // 합이 k보다 작으면
            right++;
            if (right < sequence.length) sum += sequence[right];
        } else if (sum > k) {
            // 합이 k보다 크면
            sum -= sequence[left];
            left++;
        } else {
            // 합이 k와 같을 때
            const currentLength = right - left + 1;
            
            // 더 짧은 길이를 발견하면
            if (currentLength < minLength) {
                minLength = currentLength;
                answer = [left, right];
            }
            right++;
            if (right < sequence.length) sum += sequence[right];
        }
    }

    return answer;
}