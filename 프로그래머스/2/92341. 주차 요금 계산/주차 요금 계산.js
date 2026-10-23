/**
 * 차량별 주차요금 계산
 * 입차된 후에 출차된 내역이 없는 차는 23:59 출차로 간주
 * 차량별 누적 주차시간 계산하여 일괄 정산
 *
 * 누적 주차 시간이 기본시간 이하 => 기본요금
 * 기본시간 초과 => 기본요금 + 초과한 시간 단위시간마다 단위요금
 * 단위시간으로 나누어떨어지지않으면 올림
 *
 * 차량번호 작은 자동차부터 주차요금 청구
 **/

function toMin(time) {
    let [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

function solution(fees, records) {
    let inTime = {}; //{차 번호: 입차시간(분)}
    let totalT = {}; //{차 번호: 누적분}
    let answer = [];

    for (let record of records) {
        let [time, car, type] = record.split(" ");

        if (type === "IN") {
            inTime[car] = toMin(time);
        } else {
            totalT[car] = (totalT[car] || 0) + (toMin(time) - inTime[car]);
            delete inTime[car];
        }
    }

    for (let car of Object.keys(inTime)) {
        totalT[car] = (totalT[car] || 0) + (toMin("23:59") - inTime[car]);
    }

    for (let car of Object.keys(totalT).sort()) {
        if (fees[0] < totalT[car]) {
            answer.push(
                fees[1] + Math.ceil((totalT[car] - fees[0]) / fees[2]) * fees[3]
            );
        } else {
            answer.push(fees[1]);
        }
    }
    return answer;
}
