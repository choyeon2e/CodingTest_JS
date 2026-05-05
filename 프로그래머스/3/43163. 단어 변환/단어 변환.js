/**
 * 두 단어가 한 글자만 다른지 확인해주는 함수
 **/
function isConvertible(word1, word2) {
    let count = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) count++;
        if (count > 1) return false; //두 글자 이상 다르면 return false
    }
    return count === 1;
}

/**
 * 가장 짧은 변환 과정을 찾아야함 => 최단경로 찾기 => bfs
 **/
function bfs(begin, target, words) {
    const queue = [[begin, 0]]; //[현재 단어, 단계]
    const visited = new Set();

    while (queue.length > 0) {
        const [current, step] = queue.shift();

        if (current === target) {
            return step;
        }

        for (const word of words) {
            if (!visited.has(word) && isConvertible(current, word)) {
                visited.add(word);
                queue.push([word, step + 1]);
            }
        }
    }
    return 0;
}

function solution(begin, target, words) {
    if (!words.includes(target)) return 0;
    return bfs(begin, target, words);
}
