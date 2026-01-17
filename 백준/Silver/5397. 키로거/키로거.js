const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];

for (let i = 1; i <= N; i++) {
  const charArr = input[i].trim();

  const leftStack = [];
  const rightStack = [];

  for (let char of charArr) {
    if (char === "<") {
      // 커서를 왼쪽으로 이동 => 왼쪽 글자를 오른쪽으로 옮기기
      if (leftStack.length > 0) {
        rightStack.push(leftStack.pop());
      }
    } else if (char === ">") {
      //커서를 오른쪽으로 이동 => 오른쪽 글자를 왼쪽으로 옮김
      if (rightStack.length > 0) {
        leftStack.push(rightStack.pop());
      }
    } else if (char === "-") {
      //백스페이스 => 커서의 왼쪽 글자를 pop
      if (leftStack.length > 0) {
        leftStack.pop();
      }
    } else {
      leftStack.push(char);
    }
  }
  console.log(leftStack.join("") + rightStack.reverse().join(""));
}
