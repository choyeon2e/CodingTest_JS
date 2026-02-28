/**
 * 10초 전으로 이동: prev 입력 시. 현재에서 10초 전으로 이동
 * -> 만약 현재 10초 미만이면 처음으로 이동(00:00)
 *
 * 10초 후로 이동: next 입력 시. 현재에서 10초 후로 이동
 * -> 만약 남은 시간이 10초 미만이면 마지막으로 이동 (=동영상 길이)
 *
 * 오프닝 건너뛰기: op_start<=현재 재생 위치<=op_end면 자동으로 오프닝 끝나는 위치로 이동
 *
 * 입력
 * video_len: 동영상 길이
 * pos: 기능 수행 직전 재생위치
 * op_start: 오프닝 시작 시각
 * op_end: 오프닝 끝나는 시각
 * commands: 사용자 입력. 1차원 문자열 배열
 *
 * 출력
 * 사용자의 입력이 모두 끝난 후의 동영상 위치 - mm:ss 형식으로 리턴
 */

function toSeconds(time) {
    //mm:ss 형식의 시간을 초 단위로 변환하는 함수
    const [mm, ss] = time.split(":").map(Number);
    return mm * 60 + ss;
}

function toFormat(time) {
    // 초 단위를 mm:ss 형식으로 변환하는 함수
    const mm = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
    const ss = (time % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
}

function solution(video_len, pos, op_start, op_end, commands) {
    let videoSec = toSeconds(video_len);
    let posSec = toSeconds(pos);
    let opStartSec = toSeconds(op_start);
    let opEndSec = toSeconds(op_end);

    const skipOpening = (current) => {
        if (current >= opStartSec && current <= opEndSec) {
            return opEndSec;
        } else {
            return current;
        }
    };

    posSec = skipOpening(posSec);

    commands.forEach((cmd) => {
        if (cmd === "prev") {
            posSec = Math.max(0, posSec - 10); //0초 이하로 떨어지지 않게하려고
        } else if (cmd === "next") {
            posSec = Math.min(videoSec, posSec + 10); //영상 전체 길이를 넘지 않게하려고
        }

        posSec = skipOpening(posSec);
    });

    return toFormat(posSec);
}
