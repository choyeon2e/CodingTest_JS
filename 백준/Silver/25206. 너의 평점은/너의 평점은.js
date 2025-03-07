const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const grade = {
    "A+": 4.5, "A0": 4.0, "B+": 3.5, "B0": 3.0, "C+": 2.5, "C0": 2.0, "D+": 1.5, "D0": 1.0, "F": 0.0
}

input = input.map(item => item.trim().split(' '));

let s = 0;   // 학점의 총합
let t = 0;  //전공과목별 (학점 x 과목평점)의 합

for (let [a,b,c] of input){
    if (c==='P'){
        continue;
    }
    t += b * grade[c];
    s += +b;
}

console.log(t/s);