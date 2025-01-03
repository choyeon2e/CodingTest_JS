const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let [A,B] = input[0].split(' ');

A = +A.split('').reverse().join('');
B = +B.split('').reverse().join('');

let result = 0;

console.log(A < B ? B : A);