const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [N, K] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function Josephus(N, K) {
  const queue = [];
  const result = [];
  for (let i = 1; i <= N; i++) {
    queue.push(i); //queue에 1~N 숫자 넣기
  }

  while (queue.length > 0) {
    for (let j = 0; j < K - 1; j++) {
      queue.push(queue.shift()); // 맨 앞부터 K-1번째까지 빼서 맨 뒤로 넣기
    }
    result.push(queue.shift()); //맨 앞으로 가게된 기존 K번째를 빼서 result에 넣기
  }
  return `<${result.join(", ")}>`;
}

console.log(Josephus(N, K));
