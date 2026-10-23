/**
 * 동영상 재생기의 기능: 10초전, 10초후, 오프닝 건너뛰기
 *
 * 10초전: prev 입력시 10초전으로 이동. 10초미만: 처음위치로 이동 (00:00)
 * 10초후: next 입력시 10초후로 이동. 남은시간 10초미만: 마지막위치로 이동
 * 오프닝건뛰: op_start<=현재재생위치<=op_end이면 자동으로 op_end로 이동
 **/

function from_min_to_sec(min, sec) {
    return min * 60 + sec;
}

function from_sec_to_min(t) {
    let min = Math.floor(t / 60);
    let sec = t % 60;
    return [min, sec];
}

// 오프닝 시간이면 자동건너뛰기
function skip_opening(curr_t, ops_t, ope_t) {
    if (curr_t >= ops_t && curr_t <= ope_t) {
        curr_t = ope_t;
    }
    return curr_t;
}

function solution(video_len, pos, op_start, op_end, commands) {
    let [min, sec] = video_len.split(":").map(Number);
    let [cur_m, cur_s] = pos.split(":").map(Number);
    let [ops_m, ops_s] = op_start.split(":").map(Number);
    let [ope_m, ope_s] = op_end.split(":").map(Number);

    let total_t = from_min_to_sec(min, sec);
    let curr_t = from_min_to_sec(cur_m, cur_s);
    let ops_t = from_min_to_sec(ops_m, ops_s);
    let ope_t = from_min_to_sec(ope_m, ope_s);

    curr_t = skip_opening(curr_t, ops_t, ope_t);

    // prev, next 처리
    for (let i = 0; i < commands.length; i++) {
        if (commands[i] === "next") {
            curr_t = Math.min(curr_t + 10, total_t);
        } else if (commands[i] === "prev") {
            curr_t = Math.max(curr_t - 10, 0);
        }
        curr_t = skip_opening(curr_t, ops_t, ope_t);
    }

    let [ans_m, ans_s] = from_sec_to_min(curr_t);
    return `${String(ans_m).padStart(2, "0")}:${String(ans_s).padStart(
        2,
        "0"
    )}`;
}
