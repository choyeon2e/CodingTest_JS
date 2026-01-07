const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [N, M] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function calculateDiff(n, m) {
  return Math.abs(n - m);
}

console.log(calculateDiff(N, M));
