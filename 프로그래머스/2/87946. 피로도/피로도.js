function dfs(current, count, dungeons, visited) {
    let maxCount = count;

    for (let i = 0; i < dungeons.length; i++) {
        const [required, consumption] = dungeons[i];

        if (!visited[i] && current >= required) {
            visited[i] = true;

            const currentCount = dfs(
                current - consumption,
                count + 1,
                dungeons,
                visited
            );
            maxCount = Math.max(maxCount, currentCount);
            visited[i] = false;
        }
    }
    return maxCount;
}

function solution(k, dungeons) {
    const visited = new Array(dungeons.length).fill(false);
    return dfs(k, 0, dungeons, visited);
}
