const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	const input = [];
	
	for await (const line of rl) {
		if (!line.trim()) break;
		input.push(line.trim());
	}

	const [str1, str2] = input[0].split(" ");
	console.log(cutToSix(str1, str2));
	
	process.exit();
})();

function cutToSix(str1, str2) {
	const int1 = BigInt(str1.replace(".", ""));
	const int2 = BigInt(str2.replace(".", ""));
	
	const sumInt = int1 + int2;
	let sumStr = sumInt.toString();
	
	const isNeg = sumStr.startsWith("-");
	if (isNeg) sumStr = sumStr.slice(1);

	sumStr = sumStr.padStart(7, "0"); 
	
	const intPart = sumStr.slice(0, -6); 
	const fracPart = sumStr.slice(-6);  
	
	return (isNeg ? "-" : "") + intPart + "." + fracPart;
}
