const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
input = +input[0];

let line = 0;
let count=1;
let [N,D] = [1,1]; //분자, 분모
let total = 0;
let copy = input;

while (copy>0){    //입력이 몇번째 줄에 해당하는 분수인지 line 찾기
    copy = copy - count;
    count++;
    line+=1;
}

for (let i=1; i<line;i++){
    total+=i;
}

total = input - total -1;

if (line%2===0){   
    N = 1+total;
    D= line - total;
}  else {
    N = line - total;
    D = 1 + total;
}

console.log(N + '/' + D);