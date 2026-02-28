function solution(bandage, health, attacks) {
    const [t, x, y] = bandage;
    const attackMap = new Map();
    attacks.forEach(([time, damage]) => attackMap.set(time, damage));

    const lastAttackTime = attacks[attacks.length - 1][0];
    let current_HP = health;
    let continue_time = 0;

    for (let i = 0; i <= lastAttackTime; i++) {
        if (attackMap.has(i)) {
            current_HP -= attackMap.get(i);
            continue_time = 0;

            if (current_HP <= 0) {
                return -1;
            } else {
                continue;
            }
        }

        if (i > 0) {
            continue_time++;
            current_HP += x;
        }

        if (continue_time === t) {
            current_HP += y;
            continue_time = 0;
        }

        if (current_HP > health) current_HP = health;
    }
    return current_HP;
}
