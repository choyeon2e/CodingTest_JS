const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1]; //상하좌우

function get_dir(cmd) {
    if (cmd === "U") return 0;
    if (cmd === "D") return 1;
    if (cmd === "L") return 2;
    return 3;
}

function in_range(r, c) {
    return r >= -5 && r <= 5 && c >= -5 && c <= 5;
}

function solution(dirs) {
    const visited = new Set();
    let r = 0,
        c = 0;

    for (let i = 0; i < dirs.length; i++) {
        const d = get_dir(dirs[i]);
        const nr = r + dr[d];
        const nc = c + dc[d];

        if (!in_range(nr, nc)) continue;

        visited.add(`${r}, ${c}, ${nr}, ${nc}`);
        visited.add(`${nr}, ${nc}, ${r}, ${c}`);

        r = nr;
        c = nc;
    }
    return visited.size / 2;
}
