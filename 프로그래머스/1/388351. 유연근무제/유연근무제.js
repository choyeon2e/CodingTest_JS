/**
* 출근희망시각 + 10분까지 출근해야함
* 토, 일의 출근시간은 이벤트에 영향을 x
* 모든 시각은 시 * 100 + 분 정수로 표현
* 출근희망시간에 늦지않고 출근한 직원들에게 상품 주는 이벤트
* 상품을 받을 직원은 몇명일까?
*/
function solution(schedules, timelogs, startday) {
    let result = 0;
    
    schedules.forEach((targetTime, idx) => {
        const logs = timelogs[idx];     //idx번째 직원의 7일 출근 기록
        let eventPass = true;
        
        for (let i=0; i<7; i++){
            const currentDay = (startday + i -1)%7+1;
            
            if (currentDay>=6) continue;    //주말인 경우
            
            let hour = Math.floor(targetTime/100);
            let minute = (targetTime%100)+10;   //출근 인정시간 = targetTime + 10이므로
            
            if (minute>=60){
                hour+=1;
                minute-=60;
            }
            
            const limitTime = hour*100 + minute;    //출근 인정시간
            
            if (logs[i]>limitTime){
                eventPass=false;
                break;
            }
        }
        if (eventPass) result++;
    });
    return result;
}