"""

보드에 자신이 많은 사람이 이기는 게임
보드는 4x4, 6x6, 8x8 사용

시작할때 정가운데에 배치하고 시작

이후에는 자신이 놓을 돌과 자신의 돌 사이에 상대편의 돌이 있을때에만 돌 놓기 가능
-> 이때 상대 돌은 내 돌로 만들기 가능

흑,백 플레이어가 번갈아가며 돌 놓기, 돌놓을곳 없으면 상대편 플레이어가 다시 돌놓기
보드에 빈곳 없거나 양쪽 모두 돌 놓을 곳이 없으면 게임이 끝남

"""

# 상하좌우대각선
dr = [-1, 1, 0, 0, -1, -1, 1, 1]
dc = [0, 0, -1, 1, -1, 1, -1, 1]

T = int(input())

for test_case in range(1, T + 1):
    N, M = map(int, input().split())
    board = [[0] * (N + 1) for _ in range(N + 1)]

    # 흑: 1, 백: 2
    # 초기세팅
    h = N // 2
    board[h][h] = 2
    board[h + 1][h + 1] = 2
    board[h][h + 1] = 1
    board[h + 1][h] = 1

    for _ in range(M):
        r, c, color = map(int, input().split())
        board[r][c] = color

        for d in range(8):
            flip = []
            nr, nc = r + dr[d], c + dc[d]

            while 1 <= nr <= N and 1 <= nc <= N and board[nr][nc] == 3 - color:
                flip.append((nr, nc))
                nr += dr[d]
                nc += dc[d]

            # 끝에 내 돌이 있으면 사이에 있던 상대 돌을 전부 뒤집기
            if 1 <= nr <= N and 1 <= nc <= N and board[nr][nc] == color:
                for fr, fc in flip:
                    board[fr][fc] = color

    black = 0
    white = 0
    
    for i in range(1, N + 1):
        for j in range(1, N + 1):
            if board[i][j] == 1:
                black += 1
            elif board[i][j] == 2:
                white += 1

    print(f"#{test_case} {black} {white}")
