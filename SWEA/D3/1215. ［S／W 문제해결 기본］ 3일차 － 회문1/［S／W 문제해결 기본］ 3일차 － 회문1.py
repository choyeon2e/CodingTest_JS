"""
똑바로 읽어도 거꾸로읽어도 똑같은 문장, 낱말: 회문
(ex) ABA, ABBA, A

8x8 글자판에서 제시된 길이를 가진 회문 개수 구하기 (가로 또는 세로로 이어진 회문만)
각 칸: 'A' or 'B' or 'C'

"""


def count_row(arr, N):
    cnt = 0
    for i in range(8):
        for j in range(8 - N + 1):
            s = arr[i][j:j + N]
            if s == s[::-1]:
                cnt += 1
    return cnt


def count_col(arr, N):
    cnt = 0
    for j in range(8):
        col = []
        for i in range(8):
            col.append(arr[i][j])
        for i in range(8 - N + 1):
            s = col[i:i + N]
            if s == s[::-1]:
                cnt += 1
    return cnt


for test_case in range(1, 11):
    N = int(input())
    arr = [list(input().strip()) for _ in range(8)]

    answer = count_row(arr, N) + count_col(arr, N)
    print(f"#{test_case} {answer}")
