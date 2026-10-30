/**
 * arr은 숫자 0~9
 * 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거
 * 남은 수를 반환할때는 arr 원소들의 순서를 유지해야함
 **/

function solution(arr) {
    const stack = [];
    for (let i = 0; i < arr.length; i++) {
        if (stack[stack.length - 1] !== arr[i]) {
            stack.push(arr[i]);
        }
    }
    return stack;
}
