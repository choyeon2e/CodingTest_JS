"""
푸른자성체: N극에 이끌림
붉은자성체: S극에 이끌림

자성체들이 서로 충돌하여 테이블 위에 남아있는 교착상태 개수 구하기

한쪽 방향으로 움직이는 자성체 개수가 많아도 반대방향으로 움직이는 자성체가 하나라도 있으면 교착상태라 움직이지 x
셋 이상의 자성체들이 서로 충돌하여 붙어있어도 하나의 교착상태로 봄
한줄에 두개 이상의 교착상태 발생 가능
자성체끼리는 반응 x

10개의 테케, 100x100 크기의 테이블, 1: N극 성질의 자성체(S에 이끌림), 2: S극 성질의 자성체(N에 이끌림)
테이블 윗부분: N극, 아랫부분: S극
"""

for test_case in range(1, 11):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    count = 0

    for j in range(N):
        prev = 0
        for i in range(N):
            if arr[i][j] == 1:
                prev = 1
            elif arr[i][j] == 2:
                if prev == 1:
                    count += 1
                prev = 2

    print(f"#{test_case} {count}")
