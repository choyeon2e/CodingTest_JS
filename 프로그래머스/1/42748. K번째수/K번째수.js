function solution(array, commands) {
    var answer = [];

    for (let i = 0; i < commands.length; i++) {
        const [start, end, k] = commands[i];

        const slice = array.slice(start - 1, end);
        slice.sort((a, b) => a - b);

        const n = slice[k - 1];
        answer.push(n);
    }

    return answer;
}
