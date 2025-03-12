const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');


let [N,B] = input[0].split(' ').map(item=>+item);

console.log(N.toString(B).toUpperCase());