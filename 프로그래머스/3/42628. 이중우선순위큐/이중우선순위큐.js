/**
 * I 숫자: 숫자 삽입
 * D 1: 최댓값 삭제
 * D -1: 최솟값 삭제
 *
 * 큐 비어있으면 => [0,0] return
 * 안비어있으면 => [최댓값, 최솟값] return
 **/

function solution(operations) {
    let queue = [];

    for (let i = 0; i < operations.length; i++) {
        const [command, value] = operations[i].split(" ");
        const num = Number(value);

        if (command === "I") {
            queue.push(num);
            queue.sort((a, b) => a - b);
        } else if (command === "D") {
            if (queue.length === 0) continue;
            if (num === 1) {
                queue.pop();
            } else {
                queue.shift();
            }
        }
    }

    if (queue.length === 0) {
        return [0, 0];
    } else {
        const max = queue[queue.length - 1];
        const min = queue[0];
        return [max, min];
    }
}
