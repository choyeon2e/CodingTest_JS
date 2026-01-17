const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim();

function CalculateResult(str) {
  const stack = [];
  let result = 0; // 최종 결과값
  let temp = 1; // 현재 깊이까지의 곱셈 계수

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "(") {
      temp *= 2;
      stack.push("(");
    } else if (char === "[") {
      temp *= 3;
      stack.push("[");
    } else if (char === ")") {
      // 잘못된 괄호 케이스 처리
      if (!stack.length || stack[stack.length - 1] !== "(") return 0;

      // 바로 직전이 여는 괄호였다면 (가장 안쪽 괄호)
      if (str[i - 1] === "(") result += temp;

      stack.pop();
      temp /= 2; // 깊이가 나왔으므로 다시 나누기
    } else if (char === "]") {
      // 잘못된 괄호 케이스 처리
      if (!stack.length || stack[stack.length - 1] !== "[") return 0;

      // 바로 직전이 여는 괄호였다면 (가장 안쪽 괄호)
      if (str[i - 1] === "[") result += temp;

      stack.pop();
      temp /= 3; // 깊이가 나왔으므로 다시 나누기
    }
  }

  // 모든 검사가 끝난 후 스택이 남아있으면 잘못된 괄호
  return stack.length ? 0 : result;
}

console.log(CalculateResult(input));
