/**
 * 닉네임 변경 방법
 * 1. 채팅방 나갔다가 새 닉네임으로 들어가기
 * 2. 채팅방에서 닉네임 변경하기
 * 닉네임 바꾸고 다시 들어오면 기존 채팅방 메세지 기록도 변경
 *
 * 닉네임은 중복 허용
 * 최종 메세지를 배열 형태로 리턴
 **/

function solution(record) {
    const nickMap = {};
    const actionArr = [];
    const result = [];

    for (let i = 0; i < record.length; i++) {
        let [action, uid, nickname] = record[i].split(" ");

        if (action === "Enter" || action === "Change") {
            nickMap[uid] = nickname;
        }

        if (action === "Enter" || action === "Leave") {
            actionArr.push([action, uid]);
        }
    }

    for (let [action, uid] of actionArr) {
        if (action === "Enter") {
            result.push(`${nickMap[uid]}님이 들어왔습니다.`);
        } else {
            result.push(`${nickMap[uid]}님이 나갔습니다.`);
        }
    }

    return result;
}
