/**
 * 길이가 같은 두 큐
 * 하나를 골라 pop, 그 원소를 다른 큐에 push해서 두 큐의 원소합이 같게함
 * --> 작업의 최소횟수? (pop 1회 + push 1회 = 작업 1회)
 **/

function makeSum(arr) {
    let sum = 0;
    for (const x of arr) {
        sum += x;
    }
    return sum;
}

function operations(q1, q2, sum, target, limit) {
    let head1 = 0;
    let head2 = 0;
    let count = 0;

    while (count <= limit) {
        if (sum === target) return count;

        if (sum > target) {
            const x = q1[head1++];
            sum -= x;
            q2.push(x);
        } else {
            const x = q2[head2++];
            sum += x;
            q1.push(x);
        }

        count++;
    }

    return -1;
}

function solution(queue1, queue2) {
    const total = makeSum(queue1) + makeSum(queue2);
    if (total % 2 !== 0) return -1;

    const q1 = [...queue1];
    const q2 = [...queue2];
    const limit = queue1.length * 4;
    return operations(q1, q2, makeSum(queue1), total / 2, limit);
}
