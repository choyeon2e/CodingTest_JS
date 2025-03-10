const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n').map(item=>item.split(' ').map(Number));

let max = -1;
let maxi = 0;
let maxj = 0;

for (let i=0; i<9; i++){
    for (let j=0; j<9; j++){
        if (input[i][j] > max){
            max = input[i][j];
            maxi = i+1;
            maxj = j+1;
        }
    }
}

console.log(max);
console.log(maxi, maxj);