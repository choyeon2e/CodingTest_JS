function solution(players, callings) {
    const map = new Map();
    
    players.forEach((name, i) => {
        map.set(name, i);
    });
    
    callings.forEach(name => {
        const curIdx = map.get(name);   //지금 해설자가 부른 사람의 자리
        const prevIdx = curIdx - 1; //그 사람 앞자리
        const prevPlayer = players[prevIdx];    //앞자리 선수
        
        [players[prevIdx], players[curIdx]] = [players[curIdx], players[prevIdx]];
        
        map.set(name, prevIdx);
        map.set(prevPlayer, curIdx);
    });
    return players;
}