const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = input[0].split('');
let result = 0;
for (let i=0; i<input.length/2; i++){
    if (input[i]!==input[input.length-1-i]){
        result+=1;
    }
}

if (result!==0){
    console.log(0);
} else{
    console.log(1);
}