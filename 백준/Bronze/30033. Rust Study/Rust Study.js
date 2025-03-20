const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n').map(item=>item.trim());

const N = +input.shift();
let result = 0;

for (let i=0; i<2; i++){
    input[i] = input[i].split(" ").map(Number);
}


for (let j=0; j<N; j++){
   if (input[0][j] <= input[1][j]) result+=1;
}

console.log(result);
