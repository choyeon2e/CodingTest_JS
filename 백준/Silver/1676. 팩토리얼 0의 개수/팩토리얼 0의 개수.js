const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = +fs.readFileSync(filePath).toString().trim();

let count = 0;
for (let i = 5; i <= input; i *= 5) {
    count += Math.floor(input / i);
}

console.log(count);