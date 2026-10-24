/**
 * 뒷큰수: 자신보다 뒤에 있는 숫자 중 자신보다 크면서 가장 가까이있는 수
 **/

function solution(numbers) {
    const result = Array.from({ length: numbers.length }, () => -1);
    const stack = [];

    for (let i = numbers.length - 1; i >= 0; i--) {
        const temp = numbers[i];

        while (stack.length > 0 && stack[stack.length - 1] <= temp) {
            stack.pop();
        }

        if (stack.length === 0) {
            result[i] = -1;
        } else {
            result[i] = stack[stack.length - 1];
        }
        stack.push(temp);
    }
    return result;
}
