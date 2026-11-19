dr = [-1, 1, 0, 0]  # 상하좌우
dc = [0, 0, -1, 1]
tank = ['^', 'v', '<', '>']
cmd_dir = {'U': 0, 'D': 1, 'L': 2, 'R': 3}

T = int(input())
for test_case in range(1, T + 1):
    H, W = map(int, input().split())
    arr = [list(input().strip()) for _ in range(H)]
    N = int(input())
    cmds = input().strip()

    for i in range(H):
        for j in range(W):
            if arr[i][j] in tank:
                r, c = i, j
                d = tank.index(arr[i][j])

    for cmd in cmds:
        if cmd == 'S':
            sr, sc = r, c
            while True:
                sr += dr[d]
                sc += dc[d]
                if not (0 <= sr < H and 0 <= sc < W):
                    break
                if arr[sr][sc] == '*':
                    arr[sr][sc] = '.'
                    break
                if arr[sr][sc] == '#':
                    break
        else:
            # 회전
            d = cmd_dir[cmd]
            arr[r][c] = tank[d]
            nr, nc = r + dr[d], c + dc[d]
            if 0 <= nr < H and 0 <= nc < W and arr[nr][nc] == '.':
                arr[r][c] = '.'
                r, c = nr, nc
                arr[r][c] = tank[d]

    print(f"#{test_case} {''.join(arr[0])}")
    for i in range(1, H):
        print(''.join(arr[i]))
