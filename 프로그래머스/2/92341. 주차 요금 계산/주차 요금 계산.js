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
    const [hour, min] = time.split(":").map(Number);
    return hour * 60 + min;
}

function solution(fees, records) {
    const car = {}; // {id: 입차시각(분)}
    const ing_time = {};
    const result = [];

    for (let record of records) {
        const [time, id, command] = record.split(" ");

        if (command === "IN") {
            car[id] = toMin(time);
        } else {
            ing_time[id] = (ing_time[id] || 0) + toMin(time) - car[id];
            delete car[id];
        }
    }

    for (let c of Object.keys(car)) {
        //car에 남아있는건 OUT안된거
        ing_time[c] = (ing_time[c] || 0) + toMin("23:59") - car[c];
    }

    for (let c of Object.keys(ing_time).sort()) {
        if (fees[0] < ing_time[c]) {
            result.push(
                fees[1] + Math.ceil((ing_time[c] - fees[0]) / fees[2]) * fees[3]
            );
        } else {
            result.push(fees[1]);
        }
    }
    return result;
}
