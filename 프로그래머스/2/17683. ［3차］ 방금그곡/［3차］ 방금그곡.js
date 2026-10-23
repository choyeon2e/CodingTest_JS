/**
 * 방금그곡 서비스
 * 반복재생: 노래의 끝부분, 처음부분이 이어 재생된 경우
 * 중간에 끊는경우: 네오가 기억한 멜로디가 들렸다고해도 중간에 끊으므로 그 노래가 아닌 다른 노래일 수 있음
 *
 * 서비스: 음악제목, 재생 시작되고 끝난 시각, 악보 제공
 * 음은 총 12개
 * 각 음은 1분에 1개씩 재생. 처음부터 재생되며 음악 길이보다 재생된 시간이 길 경우 처음부터 반복 재생
 * 음악길이 > 재생시간이면 처음부터 재생시간까지만 재생
 *
 * 조건에 일치하는 음악이 여러개면
 * - 재생시간이 제일 긴 음악 제목을 반환. 재생시간도 같으면 먼저 입력된 음악 제목을 반환
 * - 일치하는 음악이 없으면 None 반환
 **/

function convert(s) {
    return s
        .replaceAll("C#", "c")
        .replaceAll("D#", "d")
        .replaceAll("F#", "f")
        .replaceAll("G#", "g")
        .replaceAll("A#", "a")
        .replaceAll("B#", "b");
}

function toMin(time) {
    let [hour, min] = time.split(":").map(Number);
    return 60 * hour + min;
}

function solution(m, musicinfos) {
    let answer = "(None)";
    let maxT = 0;

    m = convert(m);

    for (let info of musicinfos) {
        let [start, end, name, code] = info.split(",");
        code = convert(code);

        let playTime = toMin(end) - toMin(start);
        let played = "";

        for (let i = 0; i < playTime; i++) {
            played += code[i % code.length];
        }

        if (played.includes(m) && playTime > maxT) {
            answer = name;
            maxT = playTime;
        }
    }
    return answer;
}
