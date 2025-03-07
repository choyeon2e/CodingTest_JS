const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim();

const croatia = ['c=', 'c-', 'dz=', 'd-', 'lj', 'nj', 's=', 'z='];

for (i of croatia) {
    input = input.replaceAll(i, 'a');
}

console.log(input.length);