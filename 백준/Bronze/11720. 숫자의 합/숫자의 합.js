const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let N = +input[0];
let nums = input[1].split('').map(Number);

let result = 0;
for (let i=0; i<nums.length; i++){
    result += nums[i];
}
console.log(result);