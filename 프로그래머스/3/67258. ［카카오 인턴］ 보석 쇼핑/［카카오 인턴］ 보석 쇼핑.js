function solution(gems) {
    const totalKinds = new Set(gems).size; //보석 총 종류 수
    const gemMap = new Map();
    let answer = [1, gems.length]; //초기값: 최대구간

    let left = 0;

    for (let right = 0; right < gems.length; right++) {
        const rightGem = gems[right];
        gemMap.set(rightGem, (gemMap.get(rightGem) || 0) + 1);

        // 모든 종류의 보석을 다 모았다면
        while (gemMap.size === totalKinds) {
            // 현재 구간이 기존 정답보다 짧은지 확인
            const currentLen = right - left;
            const prevLen = answer[1] - answer[0];

            if (currentLen < prevLen) {
                answer = [left + 1, right + 1];
            }

            // 왼쪽 보석을 하나 빼고 left 이동
            const leftGem = gems[left];
            gemMap.set(leftGem, gemMap.get(leftGem) - 1);

            if (gemMap.get(leftGem) === 0) {
                gemMap.delete(leftGem);
            }
            left++;
        }
    }

    return answer;
}
