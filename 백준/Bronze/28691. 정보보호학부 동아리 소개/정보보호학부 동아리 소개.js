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

function PrintClub(input) {
  switch (input) {
    case "M":
      return "MatKor";
    case "W":
      return "WiCys";
    case "C":
      return "CyKor";
    case "A":
      return "AlKor";
    case "$":
      return "$clear";
  }
}

console.log(PrintClub(input));
