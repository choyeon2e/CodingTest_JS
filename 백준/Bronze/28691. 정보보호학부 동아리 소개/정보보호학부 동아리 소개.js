/**
 * MatKor
 * WiCys
 * CyKor
 * AlKor
 * $clear
 */

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim();

console.log(
  { M: "MatKor", W: "WiCys", C: "CyKor", A: "AlKor", $: "$clear" }[input]
);
