const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input.map((item)=>+item);
let li = [];
for (let i=0;i<10;i++){
    li[i] = input[i]%42;
}

let answer = [...new Set(li)];
console.log(answer.length);