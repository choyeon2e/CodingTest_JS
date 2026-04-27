/**
 * 한 번호가 다른 번호의 접두어인 경우가 있는지 확인
 * 있으면 false, 없으면 true 리턴
 *
 * solve)
 * 접두어니까 맨앞에서부터 한글자씩 자르면서 확인하기
 **/

function solution(phone_book) {
    const hash = {};

    for (const number of phone_book) {
        hash[number] = true;
    }

    for (const number of phone_book) {
        for (let i = 1; i < number.length; i++) {
            const prefix = number.substring(0, i);
            if (hash[prefix]) return false;
        }
    }
    return true;
}
