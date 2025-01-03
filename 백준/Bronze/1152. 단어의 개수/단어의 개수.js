const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim();

let words = input.split(' ');
let num = 0;

for (let i=0;i<words.length; i++){
    if (words[i] !== ''){
        num++;
    }
}

console.log(num);
