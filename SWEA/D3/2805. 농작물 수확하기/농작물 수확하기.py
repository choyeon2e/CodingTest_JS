"""
농장의 크기는 항상 홀수
수확은 농장의 크기에 딱 맞는 정사각형 마름모 형태만 가능
"""

T = int(input())
for test_case in range(1, T + 1):
    N = int(input())
    arr = [list(map(int, input().strip())) for _ in range(N)]

    center = N // 2
    total = 0

    for i in range(N):
        for j in range(N):
            if abs(i - center) + abs(j - center) <= center:
                total += arr[i][j]

    print(f"#{test_case} {total}")