const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,M] = input.shift().split(" ").map(Number);
const board = input.map(item=>item.split("").map(Number));

let maxsize = 1;

for (let i=0; i<N; i++){
    for (let j=0; j<M; j++){
        for (let size=Math.min(N,M); size>0; size--){
            if (i+size-1<N && j+size-1<M){
                let a = board[i][j];
                let b = board[i][j+size-1];
                let c = board[i+size-1][j];
                let d = board[i+size-1][j+size-1];

                if (a===b && b===c && c===d){
                    maxsize = Math.max(maxsize, size);
                }
            }
        }
    }
}

console.log(maxsize**2);