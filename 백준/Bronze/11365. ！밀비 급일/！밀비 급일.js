const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n').map(item=>item.trim());

let i=0;
while (input[i]!=="END"){
    console.log(input[i].split("").reverse().join(""));
    i++;
}