const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input= input[0].toUpperCase() 
const resultArr = Array(26).fill(0);
//A-Z 아스키 범위 65~90 

for (let i of input){
    const idx = i.charCodeAt();
    resultArr[idx-65]+=1;
}

const max = Math.max(...resultArr);
const maxArr = resultArr.filter(i => i===max);

if (maxArr.length>1){
    console.log('?');
} else {
    const idx = resultArr.indexOf(max);
    console.log(String.fromCharCode(idx+65));
}