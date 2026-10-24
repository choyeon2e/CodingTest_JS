/**
 * 각 기능은 진도가 100%일때 서비스에 반영 가능
 * 각 기능의 개발속도는 모두 달라서 뒤에 있는 기능이 먼저 개발될 수도 있음
 * 이때 뒤에있는 기능은 앞에 있는 기능 배포시 함께 배포
 *
 * 각 배포마다 몇개의 기능이 배포되는지 리턴
 **/

function solution(progresses, speeds) {
    const answer = [];
    const complete_day = [];

    for (let i = 0; i < progresses.length; i++) {
        let day = Math.ceil((100 - progresses[i]) / speeds[i]);
        complete_day.push(day);
    }

    let deployDay = complete_day[0];
    let count = 1;

    for (let i = 1; i < complete_day.length; i++) {
        if (complete_day[i] <= deployDay) {
            count += 1;
        } else {
            answer.push(count);
            deployDay = complete_day[i];
            count = 1;
        }
    }
    answer.push(count);
    return answer;
}
