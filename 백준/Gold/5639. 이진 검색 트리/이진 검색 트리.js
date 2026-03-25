"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const preorder = input.map(Number);
/**
 *
 * 이진 검색 트리
 * : 노드의 왼쪽 서브트리에 있는 모든 노드의 키는 노드의 키보다 작다
 * : 노드의 오른쪽 서브트리에 있는 모든 노드의 키는 노드의 키보다 크다.
 * 왼쪽, 오른쪽 서브트리도 이진 검색 트리이다.
 *
 * 인오더: L=>root=>R
 * 포스트오더: L=>R=>root
 * 프리오더: root=>L=>R
 * => 프리오더한 결과가 주어졌을 때 포스트오더한 결과는?
 *
 * (solve)
 * 프리오더에서 첫번째 값이 루트값
 * 프리오더에서 이 루트값보다 작은 값까지 왼쪽 서브트리에 해당
 * 루트값보다 큰 값부터는 모두 오른쪽 서브트리에 해당
 *
 * 왼쪽 서브트리를 재귀 돌리기
 * 오른쪽 서브트리를 재귀돌리기
 * 루트를 push
 */

const result = [];

function getPostorder(start, end) {
  if (start > end) return;

  const root = preorder[start];
  let rightIdx = start + 1;

  while (rightIdx <= end) {
    if (preorder[rightIdx] > root) {
      break;
    }
    rightIdx++;
  }

  getPostorder(start + 1, rightIdx - 1);
  getPostorder(rightIdx, end);
  result.push(root);
}

getPostorder(0, preorder.length - 1);
console.log(result.join("\n"));
