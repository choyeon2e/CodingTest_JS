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

function solution(input){
	const N = Number(input[0]);
	const events = [];

	for (let i=1; i<=N; i++){
		const [s,e] = input[i].split(" ").map(Number);
		events.push([s,e]);
	}

	/**
	* 끝나는 시간 기준으로 오름차순 정렬하고
	* 끝나는 시간 같으면 시작 시간 기준으로 오름차순 정렬
	**/
	events.sort((a,b) => {
		if (a[1] === b[1]){
			return a[0] - b[0];
		}
		return a[1] - b[1];
	});

	let count = 0;
	let lastEndT = -1;

	for (let i=0; i<N; i++){
		const [start,end] = events[i];

		if (start >= lastEndT + 1){
			count++;
			lastEndT = end;
		}
	}
	console.log(count);
}
