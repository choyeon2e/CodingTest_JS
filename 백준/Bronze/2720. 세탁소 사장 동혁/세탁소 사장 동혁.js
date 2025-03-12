const fs = require('fs');

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

let input = fs.readFileSync(filePath).toString().trim().split('\n');
let T = Number(input.shift());

let coins = [25, 10, 5, 1];

for (let i = 0; i < T; i++) {
    let money = Number(input[i]);
    let count = [];

    for (let coin of coins) {
        count.push(Math.floor(money / coin));
        money %= coin;
    }

    console.log(count.join(' '));
}
