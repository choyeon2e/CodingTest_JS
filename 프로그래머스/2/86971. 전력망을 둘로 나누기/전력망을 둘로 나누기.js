/**
 * n개의 송전탑이 하나의 트리형태로 연결
 * 전선 하나 끊어서 네트워크를 2개로 분할하려고함
 * => 두 전력망이 가지는 송전탑 개수를 최대한 비슷하게 맞추려고함
 * ==> 이때 두 전력망이 가지는 송전탑 개수의 차이(절대값) 리턴
 *
 * solve)
 * adj 만들기 => ex. 1번과 연결된 송전탑 1번 인덱스에 모으기
 * 모든 전선을 하나씩 끊어보기(완전탐색) -> 끊긴 한쪽에 탑 몇개있는지 count로 세기(bfs)
 * 반대쪽에는 당연히 탑이 n-count만큼 있음
 * ==> 그러므로 송전탑 개수의 차이 절대값은 Math.abs(n-2*count)
 **/

//인접리스트 생성 함수
function make_adj(n, wires) {
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [v1, v2] of wires) {
        adj[v1].push(v2);
        adj[v2].push(v1);
    }
    return adj;
}

//끊은 전선인지를 확인하는 함수
function check_cut(cur, next, cut_a, cut_b) {
    return (
        (cur === cut_a && next === cut_b) || (cur === cut_b && next === cut_a)
    );
}

//bfs
function bfs(adj, n, cut_a, cut_b) {
    const visited = Array.from({ length: n + 1 }, () => false);
    let head = 0;
    let count = 1;
    const queue = [cut_a];
    visited[cut_a] = true;

    while (head < queue.length) {
        const current = queue[head++];

        for (const next of adj[current]) {
            if (visited[next]) continue;
            if (check_cut(current, next, cut_a, cut_b)) continue;

            visited[next] = true;
            queue.push(next);
            count++;
        }
    }
    return count;
}

function solution(n, wires) {
    let answer = n;
    const adj = make_adj(n, wires);

    for (const [a, b] of wires) {
        const count = bfs(adj, n, a, b);
        answer = Math.min(Math.abs(n - 2 * count), answer);
    }

    return answer;
}
