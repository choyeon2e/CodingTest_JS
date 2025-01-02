const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let [N,M] = input[0].split(' ').map((item)=>+item);
let list = [];

for (let i=1; i<=N;i++){
    list[i-1] = i;
}

for (let i=1; i<=M; i++){
    let [a,b] = input[i].split(' ').map(Number);
    let tmp = [];

    tmp = list.slice(a-1,b);
    tmp = tmp.reverse();

    list.splice(a-1,b-a+1,...tmp);
}    

console.log(...list);