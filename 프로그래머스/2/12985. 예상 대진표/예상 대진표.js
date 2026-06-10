/**
 * N명이 참가하고 토너먼트 형식으로 진행
 * 1번부터 N번까지 차례로 배정
 *
 * 1~2, 3~4, ... N-1~N번 참가자끼리 게임을 진행하고 이기면 진출
 * 다음라운드 참가자끼리 1~N/2번 부여 반복해서 1명남을때까지 진행
 *
 * A번 참가자가 B번 참가자와 몇번째 라운드에서 만나는가? (서로 붙기전까지 맨날 이김)
 **/


function solution(n, a, b) {
    let round = 0;
    let copyA = a;
    let copyB = b;
    
    while (copyA !== copyB){
        copyA = Math.ceil(copyA/2);
        copyB= Math.ceil(copyB/2);
        round++;
    }
    
    return round;
}
