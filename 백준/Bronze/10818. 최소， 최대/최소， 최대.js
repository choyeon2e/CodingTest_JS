const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let N = +input[0];
let list = input[1].split(' ').map((item)=>+item);

function solution(n,li){
    let answer = li.sort((a,b)=>a-b);
    console.log(answer[0], answer[n-1]);
}

solution(N,list);