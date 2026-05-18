// Run by Node.js
const readline = require('readline');

/**
* 5종류의 동전
* 1원, 5원, 10원, 20원, 40원
*
* N원의 거스름돈을 주기위해 필요한 동전의 최소 개수는 = ?
**/

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	const input = [];
	
	for await (const line of rl) {
		if (!line.trim()) break;
		input.push(line.trim());
	}
	let N = Number(input[0]);
	const coins = [40, 20, 10, 5, 1];

	let answer = 0;

	for (const coin of coins){
		if (N>=coin){
			answer += Math.floor(N/coin);
			N %= coin;
		}
	}

	console.log(answer);
	process.exit();
})();
