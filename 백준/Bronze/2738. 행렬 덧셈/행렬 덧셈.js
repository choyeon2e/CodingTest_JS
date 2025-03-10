const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n').map(item=>item.split(' ').map(Number));

const [n,m] = input.shift();
// 배열에서 맨 앞 값을 빼냄, 이러면 input에서는 n,m에 해당하는 값이 없어짐짐

let arr = new Array(n).fill().map(()=>new Array(m).fill(0));
//2차원 배열 생성

for (let i=0;i<n;i++){
    for (let j=0; j<m; j++){
        arr[i][j] = input[i][j] + input[i+n][j];
    }
}

let answer = '';    //출력

for (let i=0; i<arr.length;i++){
    for (let j=0;j<arr[0].length; j++){
        answer += arr[i][j] + ' ';
    }
    answer+='\n';
}

console.log(answer.trim());