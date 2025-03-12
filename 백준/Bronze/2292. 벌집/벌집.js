const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
input = +input[0];

let layer = 1;
let block = 1;

// 1 - layer 1
// 2~7 - layer 2
// 8~19 - layer 3
// 20~37 - layer 4
// ... layer가 변경될때마다 차이가 6,12,18,...

while (block<input){
    block += 6*layer;
    layer++;
}

console.log(layer);