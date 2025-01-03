const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let T = +input[0];

for (let i=1; i<=T; i++){
    let str = '';
    let [R,S] = input[i].split(' ');
    for (let j=0; j < S.length; j++){
        str += S[j].repeat(R);
    }

    console.log(str);
}