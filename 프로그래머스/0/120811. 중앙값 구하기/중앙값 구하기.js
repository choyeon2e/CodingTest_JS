function solution(array) {
    array.sort((a, b) => a - b);

    const mid = Math.floor((array.length - 1) / 2);
    return array[mid];
}
