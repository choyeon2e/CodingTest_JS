// Run by Node.js
const readline = require("readline");

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const input = [];

  for await (const line of rl) {
    if (!line.trim()) break;
    input.push(line.trim());
  }

  /**
   * 배열에 N개의 정수 순서대로 넣기
   * 숫자 K가 들어있으면 배열에 넣지 않음
   * i번째 제공되는 정수는 a[i]
   *
   * 배열에 들어갈 수 있는 정수의 개수 = ?
   **/

  const [N, K] = input[0].split(" ").map(Number);
  const arr = input[1].split(" ");

  let count = 0;

  for (let i = 0; i < N; i++) {
    if (!arr[i].includes(K)) {
      count++;
    }
  }
  console.log(count);
  process.exit();
})();
