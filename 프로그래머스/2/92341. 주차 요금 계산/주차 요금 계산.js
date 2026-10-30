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
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

function solution(fees, records) {
    const [baseTime, baseFee, unitTime, unitFee] = fees;
    const answer = [];
    const inTime = new Map();
    const total = new Map();

    for (const record of records) {
        const [time, car, type] = record.split(" ");
        const t = toMin(time);

        if (type === "IN") {
            inTime.set(car, t);
        } else {
            total.set(car, (total.get(car) || 0) + t - inTime.get(car));
            inTime.delete(car);
        }
    }

    for (const [car, t] of inTime) {
        total.set(car, (total.get(car) || 0) + toMin("23:59") - t);
    }

    const cars = [...total.keys()].sort();

    for (const car of cars) {
        const time = total.get(car);
        let fee;

        if (time <= baseTime) {
            fee = baseFee;
        } else {
            const overTime = time - baseTime;
            const overUnits = Math.ceil(overTime / unitTime);
            fee = baseFee + overUnits * unitFee;
        }
        answer.push(fee);
    }
    return answer;
}
