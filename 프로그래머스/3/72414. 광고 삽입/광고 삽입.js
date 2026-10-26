/**
 * 시청자가 가장 많이 보는 구간에 광고 삽입
 * 시청자들이 동영상 어디를 재생했는지 알 수 있음 (재생구간 기록)
 * 광고는 PIP 형태로 제공 (영상과 동시 재생 - 중간에 멈추고 삽입되는 것이 x)
 *
 * solve)
 * 1. HH:MM:SS를 초 단위로 바꾸는 함수 (toSec)
 * 2. x초~ toSec(adv_time)+x초 구간에 재생중인 구간의 수를 찾기 (1초마다)
 *  - count라는 배열에 i초에 재생중인 구간의 수를 저장 (0초부터 toSec(play_time)-1초까지)
 *  - 변수 sum에 tosec(adv_time) 크기만큼 누적합을 구함 (count[i] + ~ + count[i+toSec(adv_time) -1])
 *  - 이 변수 sum이 가장 큰 i값이 정답의 시작구간 (sum이 같은경우에는 i 갱신 x)
 * 3. 초 단위를 HH:MM:SS로 바꾸는 함수
 **/

function toSec(time) {
    const [HH, MM, SS] = time.split(":").map(Number);
    return HH * 3600 + MM * 60 + SS;
}

function toHour(sec) {
    const HH = Math.floor(sec / 3600);
    const MM = Math.floor((sec - 3600 * HH) / 60);
    const SS = sec - 3600 * HH - 60 * MM;

    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(HH)}:${pad(MM)}:${pad(SS)}`;
}

function countPlay(playT, advT, logs) {
    const count = Array.from({ length: playT + 1 }, () => 0);

    for (const [start, end] of logs) {
        count[start]++;
        count[end]--;
    }

    for (let i = 1; i <= playT; i++) {
        count[i] += count[i - 1];
    }

    let sum = 0;
    for (let i = 0; i < advT; i++) sum += count[i];

    let max = sum;
    let answer = 0;

    for (let i = 1; i + advT <= playT; i++) {
        sum += count[i + advT - 1] - count[i - 1]; //슬라이딩윈도우
        if (sum > max) {
            max = sum;
            answer = i;
        }
    }
    return toHour(answer);
}

function solution(play_time, adv_time, logs) {
    const secLogs = [];

    for (let i = 0; i < logs.length; i++) {
        const [start, end] = logs[i].split("-");
        secLogs.push([toSec(start), toSec(end)]);
    }

    return countPlay(toSec(play_time), toSec(adv_time), secLogs);
}
