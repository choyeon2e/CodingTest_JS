/**
 * 루의 과제 계획
 * 1. 시작하기로된 시각에 시작
 * 2. 새 과제 시작시간이면 진행중이던 과제 멈추고 새 과제 시작
 * 3. 진행중이던 과제 끝냈을때 잠깐 멈춘 과제 있으면 멈췄던 과제 이어 진행
 *   - 만약 과제끝난 시간에 새로 시작해야하는 과제, 잠시 멈춘과제 있으면
 *       : 새로 시작해야하는 과제부터 진행
 * 4. 멈춘 과제가 여러개면 가장 최근에 멈춘 과제부터 시작
 *
 * 과제 끝낸 순서대로 이름 배열에 담아 리턴
 **/

function toMin(time) {
    let [hour, min] = time.split(":").map(Number);
    return hour * 60 + min;
}

function solution(plans) {
    plans.sort((a, b) => toMin(a[1]) - toMin(b[1])); //정렬

    let answer = [];
    let stack = []; //[이름, 남은 시간]

    for (let i = 0; i < plans.length; i++) {
        let [name, start, playtime] = plans[i];
        let startT = toMin(start);
        playtime = Number(playtime);

        //마지막 과제이면
        if (i === plans.length - 1) {
            answer.push(name);
            break;
        }

        //현재 과제 시작시간과 다음 과제 시작시간 사이 몇분인지
        let gap = toMin(plans[i + 1][1]) - startT;

        if (playtime <= gap) {
            //gap내에 과제를 끝낼 수 있는 경우
            answer.push(name);
            let remainT = gap - playtime; //해당 과제를 끝내고 남은 시간

            while (remainT > 0 && stack.length > 0) {
                let recent = stack[stack.length - 1];

                if (recent[1] <= remainT) {
                    remainT -= recent[1];
                    answer.push(stack.pop()[0]);
                } else {
                    recent[1] -= remainT;
                    remainT = 0;
                }
            }
        } else {
            // gap내에 과제를 끝낼 수 없는 경우 -> 멈추기 = stack에 넣기
            stack.push([name, playtime - gap]);
        }
    }

    while (stack.length > 0) {
        //모든 과제를 한번씩 시작한 뒤에 중단되었던 과제들 수행
        answer.push(stack.pop()[0]);
    }

    return answer;
}
