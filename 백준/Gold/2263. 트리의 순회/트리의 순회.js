"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const inorder = input[1].split(" ").map(Number);
const postorder = input[2].split(" ").map(Number);

/**
 *
 * 인오더: L=>root=>R
 * 포스트오더: L=>R=>root
 * 프리오더: root=>L=>R
 * => 프리오더는?
 *
 * (solve)
 * 포스트오더의 맨 마지막 값은 루트 => 이 루트값을 인오더에서 찾기
 * 가운데 노드를 방문한 뒤에 왼쪽 서브트리를 똑같이 순회해야함.
 * 그 다음에는 오른쪽 서브트리를 똑같이 순회해야함
 *
 * 루트값 왼쪽은 왼쪽 서브트리 => 루트값 왼쪽을 재귀 돌리기
 * 루트값 오른쪽은 오른쪽 서브트리 => 루트값 오른쪽을 재귀돌리기
 *
 */

const inorderIdx = new Map();
inorder.forEach((val, idx) => inorderIdx.set(val, idx));

const result = [];

/**
 *
 * @param {number} inStart inorder의 시작 인덱스
 * @param {number} inEnd inorder의 끝 인덱스
 * @param {number} postStart postorder의 시작인덱스
 * @param {number} postEnd postorder의 끝 인덱스
 *
 */
function getPreorder(inStart, inEnd, postStart, postEnd) {
  if (inStart > inEnd || postStart > postEnd) return;

  const root = postorder[postEnd];
  const rootIdx = inorderIdx.get(root);

  result.push(root);

  //왼쪽 서브트리
  getPreorder(
    inStart,
    rootIdx - 1,
    postStart,
    postStart + rootIdx - inStart - 1,
  );

  //오른쪽 서브트리
  getPreorder(rootIdx + 1, inEnd, postStart + rootIdx - inStart, postEnd - 1);
}

getPreorder(0, n - 1, 0, n - 1);
console.log(result.join(" "));
