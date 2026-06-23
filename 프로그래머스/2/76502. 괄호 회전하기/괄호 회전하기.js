const pair = {
    ")": "(",
    "]": "[",
    "}": "{",
};

function isValid(str) {
    const stack = [];

    for (const ch of str) {
        if (ch === "(" || ch === "[" || ch === "{") {
            stack.push(ch);
        } else {
            if (stack.pop() !== pair[ch]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

function solution(s) {
    let answer = 0;

    for (let i = 0; i < s.length; i++) {
        const rotated = s.slice(i) + s.slice(0, i);

        if (isValid(rotated)) {
            answer++;
        }
    }
    return answer;
}
