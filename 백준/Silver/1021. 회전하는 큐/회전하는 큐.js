const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number); 
const targets = input[1].split(" ").map(Number); 
let queue = Array.from({ length: N }, (_, i) => i + 1); 
let total = 0;

for (let i=0; i<M; i++) {
    let target = targets[i];
    let index = queue.indexOf(target);
    let left = index; 
    let right = queue.length - index; 

    if (left <= right) {
        while (queue[0] !== target) {
            queue.push(queue.shift()); // 왼쪽으로 한 칸 이동
            total++;
        }
    } else {
        while (queue[0] !== target) {
            queue.unshift(queue.pop()); // 오른쪽으로 한 칸 이동
            total++;
        }
    }
    queue.shift();
}

console.log(total);
