const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,K] = input[0].split(" ").map(Number);
let arr = Array.from({length: N}, (_, i) => i + 1);
let result = [];
let index = 0;

while (arr.length>0){
    index= (index+K-1)%arr.length;  //원형구조에서 순환
    result.push(arr.splice(index,1)[0]);
}

console.log(`<${result.join(", ")}>`);
