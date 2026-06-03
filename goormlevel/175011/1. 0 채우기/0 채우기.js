// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	const input  = [];
	for await (const line of rl) {
		if (!line) rl.close();
		input.push(line);
	}
	solution(input);
	process.exit();
})();

function solution(input){
	const N = Number(input[0]);
	const board = [];

	for (let i=1; i<=N; i++){
		board.push(input[i].split(" ").map(Number));
	}

	let answer = 0;
	let zeroR = 0;
	let zeroC = 0;

	for (let r=0; r<N; r++){
		for (let c=0; c<N; c++){
			if (board[r][c] === 0){
				zeroR = r;
				zeroC = c;
			}
		}
	}

		for (let i=0; i<N; i++){
				answer += board[zeroR][i];
		}
	
			for (let i=0; i<N; i++){
				answer += board[i][zeroC];
		}
	console.log(answer);
}
