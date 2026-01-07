const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

function getMaxLength(numStr) {
  let maxCount = 1;
  let count = 1;

  for (let i = 1; i < numStr.length; i++) {
    if (numStr[i] === numStr[i - 1]) {
      count++;
      maxCount = Math.max(maxCount, count);
    } else {
      count = 1;
    }
  }

  return maxCount;
}

for (let i = 0; i < input.length; i++) {
  console.log(getMaxLength(input[i]));
}
