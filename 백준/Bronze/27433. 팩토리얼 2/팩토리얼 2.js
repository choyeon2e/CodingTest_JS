const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const N = +fs.readFileSync(filePath).toString().trim();
// N은 0보다 크거나 같은 정수

function Factorial(n) {
  let result = 1;
  if (n === 0) result = 1;
  else {
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
  }
  return result;
}

console.log(Factorial(N));
