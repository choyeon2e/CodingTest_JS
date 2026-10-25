/**
 * A-B, B-C 연결되어있으면 A-C도 간접연결
 * ==> A,B,C는 모두 같은 네트워크 상에 존재
 *
 * 네트워크의 개수 return
 * i번, j번 컴퓨터 연결되어있으면 computers[i][j]=1
 * computers[i][i] 항상 1
 **/

function bfs(computers, n, start, visited) {
    const queue = [start];
    let head = 0;
    visited[start] = true;

    while (head < queue.length) {
        const current = queue[head++];

        for (let i = 0; i < n; i++) {
            if (computers[current][i] !== 1) continue; //연결안됨
            if (visited[i]) continue; //이미 방문함
            visited[i] = true; //방문처리
            queue.push(i);
        }
    }
}

function solution(n, computers) {
    let answer = 0;
    const visited = Array.from({ length: n }, () => false);

    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        answer++; //방문하지않는 컴퓨터가 나오면 새 네트워크
        bfs(computers, n, i, visited); //방문처리
    }
    return answer;
}
