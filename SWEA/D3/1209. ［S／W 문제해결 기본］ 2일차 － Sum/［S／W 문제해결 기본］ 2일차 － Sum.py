"""
100x100 2차원배열
각 행의 합, 각 열의 합, 각 대각선의 합 중 최댓값 구하기
"""

for _ in range(10):
    tc = int(input())
    arr = [list(map(int, input().split())) for _ in range(100)]
    N = 100

    max_s = 0

    # 각행의합
    for i in range(N):
        max_s = max(max_s, sum(arr[i]))

    # 각열의합
    for j in range(N):
        col_s = 0
        for i in range(N):
            col_s += arr[i][j]

        max_s = max(max_s, col_s)

    #대각선 두개의 합
    d1=0
    d2=0

    for i in range(N):
        d1 += arr[i][i]
        d2 += arr[i][N-1-i]
    max_s = max(max_s, d1, d2)

    print(f"#{tc} {max_s}")