function solution(brown, yellow) {
    const size = brown + yellow;

    for (let h = 3; h <= Math.sqrt(size); h++) {
        if (size % h === 0) {
            let w = size / h;

            if ((w - 2) * (h - 2) === yellow) {
                return [w, h];
            }
        }
    }
}
