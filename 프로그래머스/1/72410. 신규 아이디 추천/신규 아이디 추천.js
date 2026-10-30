function solution(new_id) {
    //1단계
    let id = new_id.toLowerCase();

    //2단계
    let step2 = "";
    for (const c of id) {
        if (
            (c >= "a" && c <= "z") ||
            (c >= "0" && c <= "9") ||
            c === "-" ||
            c === "_" ||
            c === "."
        ) {
            step2 += c;
        }
    }

    //3단계
    let step3 = "";
    for (const c of step2) {
        if (c === "." && step3[step3.length - 1] === ".") continue;
        step3 += c;
    }

    //4단계
    id = step3;
    if (id[0] === ".") id = id.slice(1);
    if (id[id.length - 1] === ".") id = id.slice(0, -1);

    //5단계
    if (id === "") id = "a";

    //6단계
    if (id.length >= 16) {
        id = id.slice(0, 15);
        if (id[id.length - 1] === ".") id = id.slice(0, -1);
    }

    //7단계
    while (id.length < 3) {
        id += id[id.length - 1];
    }

    return id;
}
