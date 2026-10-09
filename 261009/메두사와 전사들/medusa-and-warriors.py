#import sys
from collections import deque

#sys.stdin = open('input.txt')

"""
0~N-1 범위의 NxN 크기 마을
도로: 0, 도로 아닌 곳: 1

- 메두사의 집: (S[r], S[c])
- 공원: (E[r], E[c])
도로(0)만을 따라 최단경로로 공원으로 이동

M명의 전사 마을에 도착
전사 초기위치: (r[i], c[i])
메두사를 향해 최단 경로로 이동

도로(0), 비도로(1) 구분없이 어디든 이동 가능
메두사가 전사를 바라보면 돌로 만들어 멈추기 가능

(1) 메두사 이동
- 도로를 따라 최단경로로 한칸 이동
    - 최단경로 여러개면 상,하,좌,우 우선순위
    - 없을 수도 있음 => 집에서 도로 가는거 불가능하면 -1 출력
- 메두사가 움직인 칸에 전사가 있으면 전사는 메두사에게 공격받음

(2) 메두사 시선
- 상,하,좌,우 중 하나 선택해 바라봄
- 바라보는 방향으로 90도의 시야각
- 시야각 범위의 전사들을 볼 수 있음. 
- 메두사의 시야각 내여도 다른 전사에 가려진 전사는 안보임 (상대적 위치)
    - 전사가 메두사와 같은 행 or 열에 있으면 전사 뒤로 곧게 뻗은 한줄이 가려짐(전사가 위치한 열)
    - 전사가 대각방향에 있으면 메두사가 바라보는 방향과 그 대각방향 사이 채워 삼각형모양으로 점점 넓어지는 영역이 가려짐
- 메두사가 보는 전사들은 다 돌로 변해서 이번 턴 끝나야 움직이기 가능
    - 두명이상의 전사들이 같은칸: 모두 돌로 변함
- 상, 하, 좌, 우 중 전사를 가장 많이 보는 방향 바라봄
- 여러개라면 상하좌우 우선순위

(3) 전사들의 이동
- 돌로 안변한 전사는 최대 두칸 이동. 같은칸 공유 가능
    1) 첫번째 이동
        - 메두사와 거리를 줄이는 방향으로 한칸이동
        - 두개 이상이면 상하좌우 우선순위
        - 격자 밖으로 나가지 x, 메두사 시야에 들어오는 곳으로는 이동 x
    2) 두번째 이동
        - 메두사와 거리를 줄일 수 있는 방향으로 한칸 더 이동
        - 두개 이상이면 좌우상하의 우선순위
        - 격자 밖으로 나가지 x, 메두사 시야에 들어오는 곳으로 이동 x
        

(4) 전사의 공격
- 메두사와 같은칸에 도달하면 전사는 메두사 공격 & 소멸

맨해튼거리 기준 최단경로 계산 (맨해튼거리: 대각선 없이 상하좌우로만 움직일때의 거리)
네 단계가 반복되어 메두사 공원 도달까지 매턴마다 
해당 턴에서 모든 전사가 이동한 거리의 합, 메두사로 인해 돌이된 전사의 수, 메두사를 공격한 전사의 수
를 공백을 사이에 두고 차례로 출력.
공원 도착하면 0 출력하고 프로그램 종료

"""

dr = [-1, 1, 0, 0]  # 상하좌우
dc = [0, 0, -1, 1]


def in_range(N, r, c):
    return 0 <= r < N and 0 <= c < N


def bfs(N, grid, er, ec):
    """공원에서 도로(0)만 따라서 BFS -> 각 칸에서 공원까지의 최단거리 구하기"""
    dist = [[-1] * N for _ in range(N)]  # 거리담는 배열
    dist[er][ec] = 0  # 공원좌표
    q = deque([(er, ec)])
    while q:
        r, c = q.popleft()
        for d in range(4):
            nr, nc = r + dr[d], c + dc[d]
            if in_range(N, nr, nc) and dist[nr][nc] == -1 and grid[nr][nc] == 0:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))
    return dist


def move_medusa(N, dist, r, c):
    """최단경로로 한칸이동 - 상하좌우"""
    for d in range(4):
        nr, nc = r + dr[d], c + dc[d]
        if in_range(N, nr, nc) and dist[nr][nc] == dist[r][c] - 1:
            # dist[nr][nc]가 dist[r][c]보다 1칸 더 공원에 가까운것을 의미 = 최단경로
            return nr, nc
    return r, c  # 이동할 칸이 없는 경우: 제자리


def get_sight(N, r, c, d, cnt):
    sdr, sdc = dr[d], dc[d]  # 메두사가 바라보는 방향
    pr, pc = sdc, sdr  # 수직 (옆으로)
    hidden = [[False] * N for _ in range(N)]  # 전사에 가려지는 칸 저장할 공간
    sight = [[False] * N for _ in range(N)]  # 메두사의 시선 내에 있는 칸 (전사 못들어감)
    stoned = []  # 돌이된전사좌표
    total = 0  # 돌이된전사 수

    for k in range(1, N):
        for j in range(-k, k + 1):
            nr, nc = r + sdr * k + pr * j, c + sdc * k + pc * j
            if not in_range(N, nr, nc) or hidden[nr][nc]:  # 숨겨졌거나 범위밖에 있으면
                continue
            sight[nr][nc] = True

            if cnt[nr][nc]:  # nr,nc좌표 칸에 전사가 몇명 있는지
                total += cnt[nr][nc]
                stoned.append((nr, nc))

                # 지금 보고있는 전사뒤에 가려지는 칸
                for t in range(1, N):
                    if j == 0:  # 정면: 일직선 가려짐
                        lo, hi = 0, 0
                    elif j > 0:  # 바깥쪽으로 넓어짐
                        lo, hi = j, j + t
                    else:
                        lo, hi = j - t, j  # 반대쪽으로 넓어짐

                    for i in range(lo, hi + 1):
                        hr = r + sdr * (k + t) + pr * i
                        hc = c + sdc * (k + t) + pc * i

                        if in_range(N, hr, hc):
                            hidden[hr][hc] = True
    return total, sight, stoned


def select_sight(N, r, c, cnt):
    """전사를 가장 많이볼수있는 방향 고르기 - 상하좌우"""
    sight = None
    for d in range(4):
        res = get_sight(N, r, c, d, cnt)
        if sight is None or res[0] > sight[0]:
            sight = res

    return sight


def move_A(N, ar, ac, r, c, sight):
    """전사 이동"""
    moves = 0
    for order in ((0, 1, 2, 3), (2, 3, 0, 1)):  # 1차:상하좌우 / 2차: 좌우상하
        dist = abs(ar - r) + abs(ac - c)  # 맨해튼거리
        moved = False
        for d in order:
            nr, nc = ar + dr[d], ac + dc[d]
            if in_range(N, nr, nc) and not sight[nr][nc] and abs(nr - r) + abs(nc - c) < dist:
                ar, ac = nr, nc
                moves += 1
                moved = True
                break
        if not moved:
            break
        if (ar, ac) == (r, c):  # 공격
            return ar, ac, moves, True

    return ar, ac, moves, False


def main():
    N, M = map(int, input().split())
    SR, SC, ER, EC = map(int, input().split())
    S = (SR, SC)  # 메두사 집 좌표
    E = (ER, EC)  # 공원 좌표
    A = list(map(int, input().split()))  # 전사들의 좌표
    A = [[A[2 * i], A[2 * i + 1]] for i in range(M)]
    grid = [list(map(int, input().split())) for _ in range(N)]  # 마을 도로정보 (0:도로 or 1:도로 x)

    dist = bfs(N, grid, ER, EC)
    if dist[SR][SC] == -1:
        print(-1)
        return

    R, C = SR, SC
    alive = [True] * M
    result = []

    while True:
        R, C = move_medusa(N, dist, R, C)
        if (R, C) == (ER, EC):
            result.append('0')  # 도착
            break

        cnt = [[0] * N for _ in range(N)]
        for i in range(M):
            if not alive[i]:
                continue
            if A[i][0] == R and A[i][1] == C:  # 전사위치=메두사위치: 전사 죽음
                alive[i] = False
            else:
                cnt[A[i][0]][A[i][1]] += 1

        stone_num, sight, stoned = select_sight(N, R, C, cnt)
        stoned = set(stoned)

        move_sum = 0
        attack = 0
        for i in range(M):
            if not alive[i] or tuple(A[i]) in stoned:
                continue
            ar, ac, moves, attacked = move_A(N, A[i][0], A[i][1], R, C, sight)
            A[i] = [ar, ac]
            move_sum += moves
            if attacked:
                attack += 1
                alive[i] = False

        result.append(f"{move_sum} {stone_num} {attack}")

    print('\n'.join(result))


main()
