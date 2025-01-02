const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let X = +input[0].split(' ')[1];
let list = input[1].split(' ').map((item)=>+item);


function solution(x,li){
    let answer = li.filter((item) => item < x).join(' ');
    console.log(answer);
}


solution(X,list)