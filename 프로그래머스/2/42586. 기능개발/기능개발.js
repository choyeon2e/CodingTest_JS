function solution(progresses, speeds) {
    const answer = [];
    
    const days = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));
    let maxDays = days[0];  //첫 기능 배포일 (기준)
    let count = 1;    //기능 수
    
    for (let i = 1; i < days.length; i++){
        if (days[i] <= maxDays){
            count++;    //같이 배포 가능
        } else {
            answer.push(count); //일단 지금까지의 기능 배포
            count = 1;
            maxDays = days[i];   //기능 배포일 기준 변경
        }
    }
    answer.push(count);
    return answer;
}