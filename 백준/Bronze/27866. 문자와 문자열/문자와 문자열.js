const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let i = +input[1];
let word = input[0].toString();

console.log(word[i-1]);
