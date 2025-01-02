const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let list = input[1].split(' ').map((item)=>+item);
let v = +input[2];

function solution(l,V){
    let answer = l.filter((li)=>li==V).length;
    console.log(answer);
}

solution(list,v);