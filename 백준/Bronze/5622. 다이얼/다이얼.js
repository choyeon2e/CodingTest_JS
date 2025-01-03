const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input[0].trim().split('');

let cnt = 0;
const dial = {
    2: "ABC",
    3:"DEF",
    4:"GHI",
    5:"JKL",
    6:"MNO",
    7:"PQRS",
    8:"TUV",
    9:"WXYZ",
}

for (let i=0; i<input.length; i++){
    for (let j=2; j<=9; j++){
        if (dial[j].includes(input[i])){
            cnt += j;
        }
    }    
}  

console.log(cnt+input.length);