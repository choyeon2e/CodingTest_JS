/**
* 선물을 주고받은 기록이 있다면: 더많은 선물 준사람에게 아닌 사람이 선물 하나 주기
* 주고받은 기록 없거나 같으면: 선물지수가 큰 사람이 작은사람에게 선물 하나 받음
* 선물지수: 자신이 친구들에게 준 선물의 수 - 받은 선물의 수
* 선물지수까지 같다면: 다음달에 선물 주고받지 않음
* 가장 많은 선물을 받을 친구가 받을 선물의 수는??
*/

function solution(friends, gifts) {
    const n = friends.length;
    const giftCount = {};   //주고받은 횟수
    const giftIndex = {}; //선물 지수
    const nextMonth = {}; //다음달에 받을 선물 수
    
    friends.forEach(name => {
        giftCount[name] = {};
        giftIndex[name] = 0;
        nextMonth[name] = 0;
    });
    
    gifts.forEach(gift => {
        const [giver, taker] = gift.split(" ");
        giftCount[giver][taker] = (giftCount[giver][taker] || 0 ) + 1;
        
        giftIndex[giver]++;
        giftIndex[taker]--;
    });
    
    for (let i=0; i<n; i++){
        for (let j=i+1; j<n; j++){
            const A = friends[i];
            const B = friends[j];
            
            const aToB = giftCount[A][B] || 0;
            const bToA = giftCount[B][A] || 0;
            
            if (aToB > bToA){
                nextMonth[A]++;
            } else if (aToB<bToA){
                nextMonth[B]++;
            } else {
                if (giftIndex[A]>giftIndex[B]){
                    nextMonth[A]++;
                } else if (giftIndex[A]<giftIndex[B]){
                    nextMonth[B]++;
                }
            }
        }
    }
    const values = Object.values(nextMonth);
    return values.length === 0 ? 0 : Math.max(...values);
}