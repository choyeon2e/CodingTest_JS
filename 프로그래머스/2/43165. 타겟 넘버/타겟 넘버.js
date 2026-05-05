function dfs(index, sum, num, target) {
    if (index === num.length) {
        if (sum === target) {
            return 1;
        }
        return 0;
    }

    return (
        dfs(index + 1, sum + num[index], num, target) +
        dfs(index + 1, sum - num[index], num, target)
    );
}

function solution(numbers, target) {
    let answer = dfs(0, 0, numbers, target);
    return answer;
}
