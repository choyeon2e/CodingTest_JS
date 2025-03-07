const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

input = + input[0];
let line = input * 2 -1; 

// 1~ N-1까지 별찍기
for (let i=1; i<input;i++){
    const blank = ' '.repeat(input-i);
    const stars = '*'.repeat(2*i-1);
    console.log(blank+stars);
}


// N~line까지 별찍기
let j=1;
for (let i=input; i<=line; i++){
    const blank = ' '.repeat(i-input);
    const stars = '*'.repeat(2*input-j);
    j+=2;
    console.log(blank+stars);
}
