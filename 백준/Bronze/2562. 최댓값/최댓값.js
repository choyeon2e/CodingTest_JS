const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input.map(item=>+item);

function solution(li){
    let max = Math.max(...li);
    let idx = li.indexOf(max);

    console.log(max);
    console.log(idx+1);
}

solution(input);