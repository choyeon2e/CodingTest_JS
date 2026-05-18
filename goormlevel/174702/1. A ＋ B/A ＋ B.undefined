// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	const input = [];
	
	for await (const line of rl) {
    if (!line.trim()) break;
    input.push(line.trim());
	}
	
	const [n1,n2] = input[0].split(" ").map(Number);
	console.log(n1+n2);
	process.exit();
})();
