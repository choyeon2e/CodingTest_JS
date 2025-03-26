const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = +fs.readFileSync(filePath).toString().trim().split('\n')[0];

console.log(input%2===0 ? 'Duck' : 'Goose');