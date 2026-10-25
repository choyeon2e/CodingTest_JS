/**
 * begin에서 target으로 변환하는 최단변환과정 찾기
 * 1. 한번에 한개의 알파벳만 변경 가능
 * 2. words 내 단어로만 변환 가능
 *
 * 변환못하면 0 리턴
 *
 * solve)
 * words 내 단어 중에 current 단어와 한글자 차이 나는걸 찾기
 * (current 시작은 begin이고 반복하며 갱신)
 **/

//cur과 한글자만 다른 단어의 위치 모으기
function diff_check(cur, words) {
    const result = [];

    for (let i = 0; i < words.length; i++) {
        let diff = 0;
        for (let j = 0; j < cur.length; j++) {
            if (cur[j] !== words[i][j]) diff++;
        }
        if (diff === 1) result.push(i);
    }
    return result;
}

function bfs(begin, target, words) {
    const visited = Array.from({ length: words.length }, () => false);
    const queue = [[begin, 0]]; //[단어, 변경횟수]
    let head = 0;

    while (head < queue.length) {
        const [cur, result] = queue[head++];
        if (cur === target) return result;

        for (const i of diff_check(cur, words)) {
            //i는 한글자만 다른 단어들의 위치
            if (visited[i]) continue;
            visited[i] = true;
            queue.push([words[i], result + 1]);
        }
    }
    return 0;
}

function solution(begin, target, words) {
    if (!words.includes(target)) return 0;
    return bfs(begin, target, words);
}
