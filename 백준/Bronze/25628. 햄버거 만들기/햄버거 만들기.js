const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

let [A,B] = input[0].split(" ").map(Number);
A = Math.floor(A/2);
console.log(A<B ? A : B);