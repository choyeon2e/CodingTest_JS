function toMin(time) {
    const [hour, min] = time.split(":").map(Number);
    return hour * 60 + min;
}

function convert(m) {
    return m
        .replaceAll("C#", "c")
        .replaceAll("D#", "d")
        .replaceAll("F#", "f")
        .replaceAll("G#", "g")
        .replaceAll("A#", "a")
        .replaceAll("B#", "b");
}

function solution(m, musicinfos) {
    let result = "(None)";
    let maxT = 0;

    m = convert(m);

    for (let info of musicinfos) {
        let [start, end, name, code] = info.split(",");
        code = convert(code);

        let playT = toMin(end) - toMin(start);
        let played = "";

        for (let i = 0; i < playT; i++) {
            played += code[i % code.length];
        }

        if (played.includes(m) && playT > maxT) {
            result = name;
            maxT = playT;
        }
    }

    return result;
}
