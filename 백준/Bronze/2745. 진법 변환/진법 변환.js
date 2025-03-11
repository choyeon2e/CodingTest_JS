const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

let [N,B] = input[0].split(' ');
N = N.split('').reverse();
B = +B;
let answer = 0;

for (let i=0; i<N.length; i++){
    if (N[i] >= 'A' && N[i]<= 'Z'){
        N[i] = N[i].charCodeAt(0)-55;
        answer += N[i] * (B**i);
    } else {
        answer += Number(N[i])*(B**i);    
    }
}

console.log(answer);