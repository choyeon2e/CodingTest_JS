/**
 * 전화번호 중 한번호가 다른 번호의 접두어인 경우가 있는지 확인
 * 접두어면 false, 접두어가 아니면 true
 **/

function solution(phone_book) {
    phone_book.sort();

    for (let i = 0; i < phone_book.length - 1; i++) {
        const now = phone_book[i];
        const next = phone_book[i + 1];

        if (next.slice(0, now.length) === now) {
            return false;
        }
    }
    return true;
}
