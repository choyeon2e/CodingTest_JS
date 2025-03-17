const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input.shift();

let dp = Array.from({length: 41}, ()=>[0,0]);

dp[0]=[1,0];
dp[1]=[0,1];

for (let i=0; i<T; i++){ 
    let n = +input[i];
    for (let j=2; j<=40; j++){
        dp[j][0] = dp[j-1][0] + dp[j-2][0];
        dp[j][1] = dp[j-1][1] + dp[j-2][1];
    }
    console.log(dp[n].join(' '));
}
