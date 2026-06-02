function solution(s) {
    let count = 0;
    let zero = 0;

    while (s !== "1") {
        const original = s.length;
        const withoutZero = s.replaceAll("0", "");
        const newL = withoutZero.length;

        zero += original - newL;
        s = newL.toString(2);

        count++;
    }

    return [count, zero];
}
