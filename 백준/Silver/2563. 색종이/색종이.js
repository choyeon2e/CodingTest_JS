const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n').map(item=>item.trim());

let num = +input.shift();
let arr = new Array(100).fill().map(()=>new Array(100).fill(0));
let answer = 0;

for (let l=0; l<num; l++){
    let [x,y] = input[l].split(' ').map(item=>+item);
    for (let i=x; i<x+10; i++){
        for (j=y; j<y+10; j++){
            if (arr[i][j]!==0){
                continue;
            }
            arr[i][j]=1;
            answer++;
        }
    }
}

console.log(answer);
