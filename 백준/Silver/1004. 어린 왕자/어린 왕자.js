const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input.shift();
let index = 0;
let result = [];

for (let t=0; t<T; t++){
    let [x1,y1,x2,y2] = input[index++].split(" ").map(item=>+item);
    let n = +input[index++];
    let count = 0;

    for (let i=0; i<n;i++){
        let [cx,cy,r] = input[index++].split(" ").map(Number);
        //출발점과 도착점이 원 내부에 있는지를 확인
        let start = (x1-cx)**2 + (y1-cy)**2 < r**2;
        let end = (x2-cx)**2 + (y2-cy)**2 < r**2;

        if (start !== end){ //한쪽만 원 내부에 있음
            count++;
        }
    }
    result.push(count);
}

console.log(result.join('\n'));