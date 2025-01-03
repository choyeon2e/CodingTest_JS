const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let answer = [];
input = input[0].toString();

for (let i='a'.charCodeAt(); i<='z'.charCodeAt(); i++){
    answer.push(input.indexOf(String.fromCharCode(i)));
}

console.log(...answer);