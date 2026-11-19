T = int(input())
for test_case in range(1, T + 1):
    N, M = map(int, input().split())
    arr = [list(map(int, input().split())) for _ in range(N)]

    max_f = 0
    for i in range(N - M + 1):
        for j in range(N - M + 1):
            total = 0
            for di in range(M):
                for dj in range(M):
                    total += arr[i + di][j + dj]
            max_f = max(max_f, total)

    print(f"#{test_case} {max_f}")
