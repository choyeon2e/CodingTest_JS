/**
 * 2진트리 초원
 * 노드 방문할 때마다 노드의 양과 늑대가 따라옴
 * 늑대는 양을 잡아먹을 기회를 노리고있고 양의 수 <= 늑대의 수면 바로 모든 양 잡아먹힘
 * 안잡아먹히게 최대한 많은 수의 양을 모아서 다시 루트 노드로 돌아오려고 함
 * 모을 수 있는 양은 최대 몇마리?
 *
 * 루트 노드에는 항상 양이 있다.
 * 0은 양, 1은 늑대
 **/

function getMaxSheep(current, sheep, wolf, info, tree, max) {
    max[0] = Math.max(max[0], sheep);

    for (let i = 0; i < current.length; i++) {
        const curr = current[i];
        const isWolf = info[curr];
        const nextSheep = isWolf ? sheep : sheep + 1;
        const nextWolf = isWolf ? wolf + 1 : wolf;

        if (nextWolf >= nextSheep) continue;

        const next = [...current];
        next.splice(i, 1);
        next.push(...tree[curr]);

        getMaxSheep(next, nextSheep, nextWolf, info, tree, max);
    }
}

function solution(info, edges) {
    const answer = [0];

    const tree = Array.from({ length: info.length }, () => []);
    for (const [parent, child] of edges) {
        tree[parent].push(child);
    }

    getMaxSheep(tree[0], 1, 0, info, tree, answer);
    return answer[0];
}
