"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const K = Number(input[0]);
const buildings = input[1].split(" ").map(Number);

/**
 * 도시의 도로는 깊이가 K인 완전이진트리 (=총 2^K-1개의 노드)
 * 각 노드에는 빌딩의 번호가 붙여져있음
 * 가장 마지막 레벨을 제외한 모든 집은 양쪽 자식을 가짐
 *
 * 1. 루트
 * 2. 왼쪽
 * 3. 왼쪽자식이 없거나 이미 방문했으면 현재 빌딩 들어가고 번호 적기
 * 4. 현재 빌딩 들어갔다온상태면 오른쪽으로 이동
 * 5. 현재 빌딩, 양쪽 자식 빌딩 모두 방문했으면 부모노드로 이동
 *
 * => 중위순회? (L=>root=>R)
 * i번째 줄에는 레벨이 i인 빌딩의 번호 출력
 *
 */

const tree = Array.from({ length: K }, () => []);

/**
 *
 * @param {number} depth 현재 노드의 깊이
 * @param {number[]} arr 탐색할 빌딩 배열
 */
function buildTree(depth, arr) {
  if (depth === K) return;

  const mid = Math.floor(arr.length / 2);
  const root = arr[mid];

  tree[depth].push(root);

  buildTree(depth + 1, arr.slice(0, mid));
  buildTree(depth + 1, arr.slice(mid + 1));
}

buildTree(0, buildings);

console.log(tree.map((level) => level.join(" ")).join("\n"));
