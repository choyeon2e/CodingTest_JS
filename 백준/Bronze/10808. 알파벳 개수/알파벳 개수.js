const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
input = input[0].split("");
let arr = Array.from({length:26}).fill(0);

for (let i=0; i<input.length; i++){
    arr[input[i].charCodeAt()-97]+=1;
}

console.log(arr.join(' '));