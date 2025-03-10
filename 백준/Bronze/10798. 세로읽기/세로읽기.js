const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n').map(item=>item.trim());

let answer = '';
let lenarr = input.map(item=>item.length);
let maxlen = Math.max(...lenarr);

for (let i=0; i<maxlen;i++){
    for (let j=0; j<input.length;j++){
        answer += input[j][i] ||  '';
    }
}

console.log(answer);
