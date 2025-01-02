const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let [N,M] = input[0].split(' ').map(item=>+item);
let list = Array(N).fill(0);

for (let i=1; i<=M; i++){
    let [a,b,c] = input[i].split(' ').map(item=>+item);
    for (let j=a; j<=b; j++){
        list[j-1] = c;
    }
}

console.log(...list);