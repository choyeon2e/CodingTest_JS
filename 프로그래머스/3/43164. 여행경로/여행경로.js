/**
 * 항상 출발공항: "ICN"
 * 방문하는 공항경로를 리턴
 *
 * solve)
 *
 **/

function dfs(current, tickets, visited, route) {
    if (route.length === tickets.length + 1) return route;

    for (let i = 0; i < tickets.length; i++) {
        const [from, to] = tickets[i];
        if (!visited[i] && from === current) {
            visited[i] = true;
            route.push(to);

            if (dfs(to, tickets, visited, route))
                return dfs(to, tickets, visited, route);
            route.pop();
            visited[i] = false;
        }
    }
    return null;
}

function solution(tickets) {
    const visited = new Array(tickets.length).fill(false);
    const route = ["ICN"];

    tickets.sort((a, b) => {
        if (a[0] === b[0]) {
            if (a[1] < b[1]) {
                return -1;
            } else {
                return 1;
            }
        }

        if (a[0] < b[0]) {
            return -1;
        } else {
            return 1;
        }
    });

    dfs("ICN", tickets, visited, route);
    return route;
}
