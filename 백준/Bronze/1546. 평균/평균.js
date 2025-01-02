const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let N = +input[0];

let score = input[1].split(' ').map(Number);
let max = Math.max(...score);

for (let i=0;i<N;i++){
    score[i] = score[i]/max*100;
}

let sum = 0;

score.forEach(i=>{
    sum+=i;
})

console.log(sum/N);