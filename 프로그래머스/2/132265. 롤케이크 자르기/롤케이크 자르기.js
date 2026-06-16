function solution(topping) {
    let answer = 0;
    const older = new Set(); //형꺼
    const younger = new Map(); //동생꺼

    for (const t of topping) {
        younger.set(t, (younger.get(t) || 0) + 1);
    }

    for (const t of topping) {
        older.add(t); //형 토핑 추가

        if (younger.has(t)) {
            younger.set(t, younger.get(t) - 1);
            if (younger.get(t) === 0) {
                younger.delete(t);
            }
        }

        if (older.size === younger.size) {
            answer++;
        }

        if (older.size > younger.size) {
            break;
        }
    }
    return answer;
}
