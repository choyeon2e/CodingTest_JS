const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const Farr = input[1].split(" ").map(Number);

Farr.sort((a, b) => a - b); //a<=b면 Farr[a]<=Farr[b]

let result = 0;
let left = 0;

function CheckF(F, result, left) {
  for (let right = 0; right < N; right++) {
    while (left < right && F[left] < F[right] * 0.9) {
      left++;
    }
    result += right - left;
  }
  return result;
}
console.log(CheckF(Farr, result, left));
