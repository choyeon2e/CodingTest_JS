function solution(array) {
    let count = 0;

    for (let i = 0; i < array.length; i++) {
        const arr = array[i].toString().split("").map(Number);

        arr.forEach((num) => {
            if (num === 7) count++;
        });
    }

    return count;
}
