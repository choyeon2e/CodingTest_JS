/**
 * 닉네임 변경 방법
 * 1. 채팅방 나갔다가 새 닉네임으로 들어가기
 * 2. 채팅방에서 닉네임 변경하기
 * 닉네임 바꾸고 다시 들어오면 기존 채팅방 기록도 변경
 *
 * 닉네임은 중복 허용
 * 최종 메세지를 배열 형태로 리턴
 **/

function solution(record) {
    const idMap = new Map();
    const actions = [];

    for (const line of record) {
        const [cmd, id, name] = line.split(" ");

        if (name) idMap.set(id, name);
        if (cmd !== "Change") {
            actions.push({ cmd, id });
        }
    }

    const messageTemplates = {
        Enter: "님이 들어왔습니다.",
        Leave: "님이 나갔습니다.",
    };

    const result = actions.map(({ cmd, id }) => {
        const nickname = idMap.get(id);
        return `${nickname}${messageTemplates[cmd]}`;
    });

    return result;
}
