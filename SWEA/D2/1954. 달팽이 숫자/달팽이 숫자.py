T = int(input())
for test_case in range(1, T + 1):
    N = int(input())
    arr = [[0] * N for _ in range(N)]

    dr = [0, 1, 0, -1]  # 우하좌상(시계방향)
    dc = [1, 0, -1, 0]

    r, c, d = 0, 0, 0
    for num in range(1, N * N + 1):
        arr[r][c] = num

        nr, nc = r + dr[d], c + dc[d]
        if not (0 <= nr < N and 0 <= nc < N) or arr[nr][nc] != 0:
            d = (d + 1) % 4
            nr, nc = r + dr[d], c + dc[d]

        r, c = nr, nc

    print(f"#{test_case}")

    for row in arr:
        print(*row)
