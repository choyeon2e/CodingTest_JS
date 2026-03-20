"use strict";

const fs = require("fs");
const input = fs
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const parents = input[1].split(" ").map(Number);
const deleteTarget = Number(input[2]);

/**
 * 트리에서 노드 하나를 지움 -> 이때 남은 트리에서의 리프노드 개수 =?
 * (노드를 지우면 그 노드와 노드의 모든 자손이 트리에서 제거)
 *
 * 1. tree 배열에 index parent, value child 구조로 push
 * 2. 루프로 루트부터 노드 전체를 돌며 각 노드의 자식노드 수 세기
 * 3. 각 노드들의 자식노드가 0인 노드는 리프노드니까 leaf++
 */

const tree = Array.from({ length: N }, () => []);
let root = -1;

parents.forEach((parent, child) => {
    if (parent === -1) {
        root = child;
    } else {
        tree[parent].push(child);
    }
});

if (deleteTarget === root) {
    console.log(0);
    return;
}

let leaf = 0;

function countLeaf(node) {
    let child = 0;
    for (const n of tree[node]) {
        if (n === deleteTarget) continue;
        child++;
        countLeaf(n);
    }
    if (child === 0) leaf++;
}

countLeaf(root);
console.log(leaf);
