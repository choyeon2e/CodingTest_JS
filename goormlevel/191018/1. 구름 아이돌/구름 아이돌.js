const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });
    const input = [];

    for await (const line of rl) {
        if (!line.trim()) break;
        input.push(line.trim());
    }

    const N = Number(input[0]); 
	  const scores = input[1].split(' ').map(Number);

		const S = scores.map((score,index)=>({
			score: score,
			id: index+1
		}))

	  S.sort((a,b)=>b.score-a.score);
    console.log(S.slice(0,3).map(c=>c.id).join(" "));
    process.exit();
})();
