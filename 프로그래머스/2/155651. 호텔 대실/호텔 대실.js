/**
 * 최소한의 객실만 사용해서 예약손님 받기
 * 한번 사용한 객실은 퇴실시간 기준 10분간 청소하고 다음 손님이 사용 가능
 * 최소객실의 수 return하기
 **/

function toMin(time) {
    const [hour, min] = time.split(":").map(Number);
    return hour * 60 + min;
}

function solution(book_time) {
    let room = [];
    book_time.sort((a, b) => toMin(a[0]) - toMin(b[0]));

    for (let i = 0; i < book_time.length; i++) {
        let [start, end] = book_time[i];
        let [s, e] = [toMin(start), toMin(end)];

        let idx = -1;
        for (let j = 0; j < room.length; j++) {
            if (room[j] + 10 <= s) {
                idx = j;
                break;
            }
        }

        if (idx === -1) {
            room.push(e);
        } else {
            room[idx] = e;
        }
    }
    return room.length;
}
