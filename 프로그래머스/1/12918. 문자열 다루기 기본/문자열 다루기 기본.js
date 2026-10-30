/**
 * s 길이 4 or 6 && 숫자로만 구성되어있는지 확인
 **/

function solution(s) {
    if (s.length !== 4 && s.length !== 6) return false;
    for (const c of s) {
        if (c < "0" || c > "9") return false;
    }
    return true;
}
