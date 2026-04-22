/**
 * h번 이상 인용된 논문 h편 이상, 나머지 논문이 h번 이하 인용되었다면
 * H-Index: h의 최댓값
 **/

function solution(citations) {
    var answer = 0;
    citations.sort((a, b) => b - a); //내림차순 정렬

    for (let i = 0; i < citations.length; i++) {
        if (citations[i] >= i + 1) {
            answer = i + 1;
        } else {
            break;
        }
    }
    return answer;
}
