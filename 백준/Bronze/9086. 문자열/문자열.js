const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let T = +input[0];

for (let i = 1; i<=T;i++){
    let word = input[i].trim().toString();
    console.log(word[0]+word[word.length-1]);
}
