function dfs(current, tickets, visited, path, ticketCount) {
    if (path.length === ticketCount + 1) {
        return path;
    }

    for (let i = 0; i < tickets.length; i++) {
        const [from, to] = tickets[i];

        if (!visited[i] && from === current) {
            visited[i] = true;
            path.push(to);

            const result = dfs(to, tickets, visited, path, ticketCount);
            if (result) return result;
            path.pop();
            visited[i] = false;
        }
    }
    return null;
}

function solution(tickets) {
    tickets.sort((a, b) => {
        if (a[0] === b[0]) return a[1] < b[1] ? -1 : 1;
        return a[0] < b[0] ? -1 : 1;
    });

    const visited = new Array(tickets.length).fill(false);
    return dfs("ICN", tickets, visited, ["ICN"], tickets.length);
}
