const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

let n = +input.shift(); //학생 수
let arr = [];
let count = new Array(n).fill(0);

for (let i=0; i<n; i++){
        arr.push(input[i].trim().split(' ').map(item=>+item))
}

for (let i=0; i<n; i++){
    for (let j=0; j<n; j++){
        if (i===j) continue;
        for (let grade =0; grade<5; grade++){
            if (arr[i][grade]===arr[j][grade]){
                count[i]++;
                break;
            }
        }
    }
}

let maxCount = Math.max(...count);
let leader = count.indexOf(maxCount) + 1;

console.log(leader);