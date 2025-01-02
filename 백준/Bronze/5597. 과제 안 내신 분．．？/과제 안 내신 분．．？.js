const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input.map(item=>+item);

let answer = [];

for (let i=1; i<=30; i++){
    if (!input.includes(i)){
        answer.push(i);
    }
}

console.log(answer.sort((a,b)=>a-b).join('\n'));