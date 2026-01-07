const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const n = Number(fs.readFileSync(filePath).toString().trim());

function CalculateFunc(n) {
  let sum = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== n / i) sum += n / i;
    }
  }
  return sum * 5 - 24;
}

console.log(CalculateFunc(n));
