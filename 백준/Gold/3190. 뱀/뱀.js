const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const K = +input[1];

/**
 * 0: 비어있는 좌표
 * 1: 사과가 있는 좌표
 * 2: 뱀의 몸이 있는 좌표
 */

const board = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0)); //보드 생성

for (let i = 2; i < K + 2; i++) {
  const [r, c] = input[i].split(" ").map(Number); //row, column 넣기
  board[r][c] = 1; // 사과 있는 곳의 좌표를 board에 1로 설정
}

const L = +input[K + 2];
const movingArr = []; //뱀의 방향 변환 정보를 넣을 배열

for (let i = K + 3; i < K + 3 + L; i++) {
  const [X, C] = input[i].split(" ");
  movingArr.push([+X, C.trim()]);
}

// 동(0), 남(1), 서(2), 북(3) - 시계 방향 순서
const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

let time = 0;
let dir = 0; // 처음엔 오른쪽을 향하므로

let headR = 1;
let headC = 1;

const snake = [[1, 1]]; //뱀의 몸 좌표를 담는 큐
board[1][1] = 2; //시작좌표에 뱀이 있으므로 2로 표시

while (true) {
  time++;

  const nr = headR + dr[dir];
  const nc = headC + dc[dir];

  if (nr < 1 || nr > N || nc < 1 || nc > N || board[nr][nc] === 2) {
    break; //벽에 부딪힘 or 자기 몸에 부딪힘 => 끝
  }

  if (board[nr][nc] === 1) {
    //사과 있으면 머리 추가, 꼬리 그대로
    board[nr][nc] = 2;
    snake.push([nr, nc]);
  } else {
    //사과 없으면 머리 추가, 꼬리 제거
    board[nr][nc] = 2;
    snake.push([nr, nc]);
    const [tailR, tailC] = snake.shift();
    board[tailR][tailC] = 0;
  }

  headR = nr;
  headC = nc;

  if (movingArr.length > 0 && time === movingArr[0][0]) {
    const [X, nextDir] = movingArr.shift();
    if (nextDir === "D") {
      //오른쪽 회전이면
      dir = (dir + 1) % 4;
    } else {
      //왼쪽 회전이면
      dir = (dir + 3) % 4;
    }
  }
}

console.log(time);
