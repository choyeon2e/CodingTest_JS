const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

let n = +input.shift();

for (let i=0; i<n; i++){
    const [x1,y1,r1,x2,y2,r2] = input[i].split(" ").map(Number);
    
    const dx = x2-x1;
    const dy = y2-y1;
    const d = dx**2+dy**2;  //두 중점 사이의 거리의 제곱
    const rsum = (r1+r2)**2;
    const rdiff = (r1-r2)**2;

    if (d===0 && r1===r2){
        console.log(-1)
    } else if (rsum===d || rdiff===d){
        console.log(1);
    } else if (rsum<d || rdiff>d){
        console.log(0);
    } else {
        console.log(2);
    }
}