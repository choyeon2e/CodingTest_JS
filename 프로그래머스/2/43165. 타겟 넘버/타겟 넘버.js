function solution(numbers, target) {
    const queue = [[0, 0]]; //[index, sum]
    let head = 0;
    let count = 0;

    while (head < queue.length) {
        const [index, sum] = queue[head++];

        if (index === numbers.length) {
            if (sum === target) count++;
            continue;
        }
        queue.push([index + 1, sum + numbers[index]]);
        queue.push([index + 1, sum - numbers[index]]);
    }
    return count;
}
