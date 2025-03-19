const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift();
const nums = input.map(item=>item.trim().split("").reverse());
const len = nums[0].length;

for (let i=1; i<=len; i++){
    let s = new Set();
    let unique = true;

    for (let j=0; j<N; j++){
        let snum = nums[j].slice(0,i).join("");
        if (s.has(snum)){
            unique = false;
            break;
        }
        s.add(snum);
    }
    if (unique){
        console.log(i);
        break;
    }
}