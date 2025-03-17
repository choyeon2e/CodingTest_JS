const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
input = input[0];
let result = [];

for (let i=1; i<input.length-1; i++){
    for (let j=i+1; j<input.length; j++){
        let part1 = input.slice(0,i).split('').reverse().join("");
        let part2 = input.slice(i,j).split('').reverse().join('');
        let part3 = input.slice(j).split('').reverse().join('');
        let word = part1+part2+part3;
        result.push(word);
    }
}

console.log(result.sort()[0]);

