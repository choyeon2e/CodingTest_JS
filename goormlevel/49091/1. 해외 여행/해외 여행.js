// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	const input = [];
	for await (const line of rl) {
		if (!line) rl.close();
		input.push(line);
	}
	solution(input);
	process.exit();
})();

/**
* 1번나라에 살고 N번 나라에 가고싶음
* 최대한 돈을 절약하는 방법으로 가고자 함
*
* 총 M개의 교통편 정보
* 각 교통편 정보: 출발하는 나라 A, 도착하는 나라 B, 교통편 이용하는데 소모되는 가격 W
*
* N번 나라에 도착하기 위한 최소 비용 = ?
* N번 나라 갈 수 없으면 go home 출력
**/

function solution(input) {
    const [N, M] = input[0].split(" ").map(Number);
    const graph = Array.from({ length: N + 1 }, () => []);

    for (let i = 1; i <= M; i++) {
        const [A, B, W] = input[i].split(" ").map(Number);
        graph[A].push([B, W]);
    }

    const dist = Array(N + 1).fill(Infinity);
    dist[1] = 0;
    const queue = [[1, 0]]; 
    let idx = 0; 

    while (idx < queue.length) {
        const [curr, currCost] = queue[idx++]; 

        if (dist[curr] < currCost) continue;

        for (const [next, weight] of graph[curr]) {
            const nextCost = currCost + weight;
            
            if (nextCost < dist[next]) {
                dist[next] = nextCost;
                queue.push([next, nextCost]);
            }
        }
    }
    console.log(dist[N] === Infinity ? "go home" : dist[N]);
}
