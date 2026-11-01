/**
 * 암호의 규칙
 * 1. s의 각 알파벳을 index만큼 뒤 알파벳으로 바꿈
 * 2. index만큼 뒤 알파벳이 z 넘으면 a로 돌아감
 * 3. skip 알파벳은 제외하고 건너뜀
 **/

function skip_s(skip) {
    const skip_arr = [];
    const a_code = "a".charCodeAt(0);
    const z_code = "z".charCodeAt(0);

    for (let code = a_code; code <= z_code; code++) {
        const c = String.fromCharCode(code);
        if (!skip.includes(c)) {
            skip_arr.push(c);
        }
    }
    return skip_arr;
}

function solution(s, skip, index) {
    const skip_str = skip_s(skip);
    let answer = "";

    for (const c of s) {
        const i = skip_str.indexOf(c);
        const new_i = (i + index) % skip_str.length;

        answer += skip_str[new_i];
    }
    return answer;
}
