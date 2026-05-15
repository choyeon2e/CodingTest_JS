function solution(sequence, k) {
    let answer = [0, sequence.length - 1];
    let left = 0;
    let right = 0;
    let sum = sequence[0];
    let min = sequence.length + 1;

    while (right < sequence.length) {
        if (sum < k) {
            right++;
            if (right < sequence.length) sum += sequence[right];
        } else if (sum > k) {
            sum -= sequence[left];
            left++;
        } else {
            const current = right - left + 1;

            if (current < min) {
                min = current;
                answer = [left, right];
            }
            right++;
            if (right < sequence.length) sum += sequence[right];
        }
    }
    return answer;
}
