const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = +fs.readFileSync(filePath).toString().trim().split('\n')[0];

const result = input.toString(2).split('').filter(bit=>bit==='1').length;

console.log(result);