const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n').map(Number);

const n = +input.shift();

const d = input[1]-input[0];
const r = input[1]/input[0];

if (input[2]-input[1] === d){
    console.log(input[n-1]+d);
} else if (input[2]/input[1] === r){
    console.log(input[n-1]*r);
}
