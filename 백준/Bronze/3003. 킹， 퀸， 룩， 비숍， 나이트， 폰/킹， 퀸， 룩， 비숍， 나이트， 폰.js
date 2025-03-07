const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input[0].split(' ').map(item=>+item);

const chessArr = [1,1,2,2,2,8];
const resultArr = Array(5).fill(0);

for (let i =0; i<chessArr.length; i++){
    resultArr[i] = chessArr[i]-input[i];
}

console.log(resultArr.join(' '));