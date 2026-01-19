const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

function checkPPAP(str) {
  // 예외 처리: "P" 하나만 들어오는 경우도 PPAP 문자열
  if (str === "P") return "PPAP";

  const stack = [];

  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);

    // 스택의 끝 4글자가 PPAP 인지 확인
    if (stack.length >= 4) {
      if (
        stack[stack.length - 4] === "P" &&
        stack[stack.length - 3] === "P" &&
        stack[stack.length - 2] === "A" &&
        stack[stack.length - 1] === "P"
      ) {
        // PPAP가 맞다면 뒤의 4개를 빼고 P 하나를 넣음
        stack.pop();
        stack.pop();
        stack.pop();
        stack.pop();
        stack.push("P");
      }
    }
  }

  // 최종 결과가 "P" 하나면 PPAP 문자열
  return stack.length === 1 && stack[0] === "P" ? "PPAP" : "NP";
}

console.log(checkPPAP(input));