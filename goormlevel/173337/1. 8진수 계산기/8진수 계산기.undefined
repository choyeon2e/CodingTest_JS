// Run by Node.js
const readline = require('readline');

/**
* 8진수 계산기: N개의 10진수 정수가 주어지면 다 더해서 8진수로 표시
**/

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	const input = [];
	
	for await (const line of rl) {
		if (!line.trim()) break;
		input.push(line.trim());
	}

	const N = Number(input[0]);
	const v = input[1].split(" ").map(Number);

	let sum = 0;

	v.forEach((n)=>{
		sum+=n;
	})
	console.log(sum.toString(8));
	
	process.exit();
})();
