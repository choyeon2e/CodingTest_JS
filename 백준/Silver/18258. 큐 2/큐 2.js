"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const orders = input.slice(1);

/**
 * push X: 정수 X를 큐에 넣는 연산이다.
 * pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
 * size: 큐에 들어있는 정수의 개수를 출력한다.
 * empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
 * front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
 * back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
 */

const queue = [];
const answer = [];
let head = 0;

for (let i = 0; i < N; i++) {
  const [cmd, X] = orders[i].split(" ");

  switch (cmd) {
    case "push":
      queue.push(Number(X));
      break;
    case "pop":
      if (queue.length - head === 0) {
        answer.push(-1);
      } else {
        answer.push(queue[head]);
        head++;
      }
      break;
    case "size":
      answer.push(queue.length - head);
      break;
    case "empty":
      answer.push(queue.length - head === 0 ? 1 : 0);
      break;
    case "front":
      answer.push(queue.length - head === 0 ? -1 : queue[head]);
      break;
    case "back":
      answer.push(queue.length - head === 0 ? -1 : queue[queue.length - 1]);
      break;
  }
}

console.log(answer.join("\n"));
