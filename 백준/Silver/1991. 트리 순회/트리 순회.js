"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이진 트리의 노드의 개수: N
 * N개의 줄에 걸쳐 왼쪽노드, 오른쪽노드 주어짐
 * A부터 알파벳대문자로 노드의 이름
 * 항상 A가 루트 노드
 * 자식노드가 없으면 .
 *
 * 첫째줄에 전위 (r->L->R)
 * 둘째줄에 중위 (L->r->R)
 * 셋째줄에 후위 (L->R->r)
 */

const N = +input[0];
const tree = {};

for (let i = 1; i <= N; i++) {
  const [node, left, right] = input[i].split(" ");
  tree[node] = [left, right];
}

let result = "";

function preOrder(node) {
  if (node === ".") return;
  const [left, right] = tree[node];
  result += node;
  preOrder(left);
  preOrder(right);
}

function inOrder(node) {
  if (node === ".") return;
  const [left, right] = tree[node];
  inOrder(left);
  result += node;
  inOrder(right);
}

function postOrder(node) {
  if (node === ".") return;
  const [left, right] = tree[node];
  postOrder(left);
  postOrder(right);
  result += node;
}

preOrder("A");
result += "\n";
inOrder("A");
result += "\n";
postOrder("A");
result += "\n";

console.log(result);
