const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

input.shift();


let arr = [...new Set(input)];  // 중복 제거

arr = arr.sort((a,b)=> a.length-b.length || a.localeCompare(b));
console.log(arr.join('\n'));