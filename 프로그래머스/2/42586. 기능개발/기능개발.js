/**
 * 각 기능은 진도가 100%일때 서비스 반영이 가능
 * 뒤에 있는 기능이 앞보다 먼저 개발될 수 있음
 * => 뒤에 있는 기능은 앞 기능 배포 시 함께 배포
 **/

function solution(progresses, speeds) {
    const complete = [];
    let answer = [];

    for (let i = 0; i < progresses.length; i++) {
        if ((100 - progresses[i]) % speeds[i] === 0) {
            complete.push((100 - progresses[i]) / speeds[i]);
        } else {
            complete.push(Math.ceil((100 - progresses[i]) / speeds[i]));
        }
    }

    let day = complete[0];
    let count = 0;

    for (const d of complete) {
        if (d <= day) {
            count++;
        } else {
            answer.push(count);
            day = d;
            count = 1;
        }
    }
    answer.push(count);
    return answer;
}
