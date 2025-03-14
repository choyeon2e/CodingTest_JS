const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

let T = +input.shift();
const dp = Array.from({length: 30}, ()=> Array(30).fill(0));

for (let i=0; i<30; i++){
    dp[i][0] = 1;
    dp[i][i] = 1;
}

//dp 점화식 이용
for (let i=1; i<30; i++){
    for (let j=1; j<i; j++){
        dp[i][j] = dp[i-1][j-1] + dp[i-1][j];
    }
}

for (let i=0; i<T; i++){
    let [N,M] = input[i].split(' ').map(item=>+item);
    console.log(dp[M][N]);  //M개 중에 N개
}