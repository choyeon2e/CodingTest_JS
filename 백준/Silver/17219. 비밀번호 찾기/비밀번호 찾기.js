"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let line = 1;
const siteMap = new Map();
for (let i = 1; i <= N; i++) {
  const [siteName, sitePW] = input[line++].trim().split(" ");
  siteMap.set(siteName, sitePW);
}

let result = [];
for (let i = line; i <= line + M; i++) {
  const toFindSiteName = input[i];
  result.push(siteMap.get(toFindSiteName));
}

console.log(result.join("\n"));
