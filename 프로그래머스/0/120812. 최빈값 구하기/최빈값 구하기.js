function solution(array) {
    const counts = {};
    let max = 0;
    let answer = -1;
    let isOnly = true;

    array.forEach((num) => {
        counts[num] = (counts[num] || 0) + 1;
    });

    for (const num in counts) {
        const count = counts[num];

        if (count > max) {
            max = count;
            answer = Number(num);
            isOnly = true;
        } else if (count === max) {
            isOnly = false;
        }
    }

    return isOnly ? answer : -1;
}
