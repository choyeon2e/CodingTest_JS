/**
 * 문자열에서 같은값 연속 => 그 문자의 개수와 반복되는 값으로 표현
 * 문자열을 1개 이상 단위로 잘라 압축, 가장 짧은 것의 길이를 리턴
 **/

function slicing(s, n) {
    //s를 n개씩 슬라이싱
    const slice_arr = [];

    for (let i = 0; i < s.length; i += n) {
        slice_arr.push(s.slice(i, i + n));
    }
    return slice_arr;
}

function pressStr(slice_arr) {
    let result = "";
    let prev = slice_arr[0];
    let count = 1;

    for (let i = 1; i < slice_arr.length; i++) {
        if (slice_arr[i] === prev) {
            count++;
        } else {
            result += (count > 1 ? count : "") + prev;
            prev = slice_arr[i];
            count = 1;
        }
    }

    result += (count > 1 ? count : "") + prev;
    return result;
}

function solution(s) {
    let answer = s.length;

    for (let n = 1; n <= s.length / 2; n++) {
        const slice_arr = slicing(s, n);
        const press_s = pressStr(slice_arr);
        if (press_s.length < answer) {
            answer = press_s.length;
        }
    }
    return answer;
}
