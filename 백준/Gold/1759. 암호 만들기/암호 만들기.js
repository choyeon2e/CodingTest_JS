"use strict";

const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [L, C] = input[0].split(" ").map(Number);
const arr = input[1].trim().split(" ").sort();

/**
 * 가능성있는 암호들을 모두 구하자 => 조합
 *
 * 서로다른 L개의 알파벳 소문자들로 구성
 * 최소 한개의 모음(aeiou)과 최소 2개의 자음으로 구성
 * 알파벳은 오름차순 정렬
 */

const vowel = ["a", "e", "i", "o", "u"];

let result = "";
const availablePW = [];

/**
 * @param {number} count 뽑은 문자 개수
 * @param {number} start 시작 인덱스
 */
function makePW(count, start) {
  if (count === L) {
    if (isValid(availablePW)) {
      result += availablePW.join("") + "\n";
    }
    return;
  }

  for (let i = start; i < C; i++) {
    availablePW.push(arr[i]);
    makePW(count + 1, i + 1);
    availablePW.pop();
  }
}

/**
 * @param {string} pw 유효한지 확인할 비밀번호 문자열
 * @returns 모음이 1개 이상이고 자음이 2개 이상일 경우 true 리턴
 */
function isValid(pw) {
  let v_count = 0; //모음 수
  let c_count = 0; //자음 수

  for (const char of pw) {
    if (vowel.includes(char)) v_count++;
    else c_count++;
  }

  return v_count >= 1 && c_count >= 2;
}

makePW(0, 0);
console.log(result.trim());
