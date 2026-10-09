#import sys
from collections import deque

#sys.stdin = open('input.txt')

"""
NxN 크기의 바다 - 0: 바다 / 1: 암초 (장애물)
아기고래 초기 위치: (r,c), 처음에 바라보는 방향 d
방향: 1,2,3,4 - 상,하,좌,우

목표: 모든 바다 탐험

1) 인접탐험
상하좌우 인접한 칸 중 방문하지않은 바다칸으로 한칸 이동
- 우선순위
    - 현재 바라보는 방향으로 직진
    - 좌회전 후 직진
    - 우회전 후 직진
    - 180도 회전 후 직진 (바라보던 방향 반대로)
d는 이동한 방향으로 갱신
인접한 칸에 방문가능 바다 없을때까지 반복

2) 가장 가까운 바다로 이동
인접한 칸에 방문가능바다가 없으면 아직 안방문한 바다 칸 중 가장가까운 칸으로 이동
- 이미 방문한 바다는 지나갈 수 있고 상하좌우 인접칸 한칸씩 이동하는 최소 이동 횟수
- 가장 가까운 칸이 여러개면 행번호가 가장 작은칸. 얘도 같으면 열번호가 가장 작은 칸
- 최단거리로 이동 (우선순위: 좌하우상)
d는 마지막 이동방향으로 갱신

도착 후에는 1단계부터 반복 * 헤엄칠 수 있는 모든 바다 방문시 종료
방문 바다칸 위치를 순서대로 출력 (시작 위치도 포함)

"""

dr = [-1, 1, 0, 0]  # 상하좌우(상-0, 하-1, 좌-2, 우-3)
dc = [0, 0, -1, 1]

"""회전시 d 갱신을 위한 변환표 - 인덱스로 사용하면됨"""
LEFT = [2, 3, 1, 0]  # 좌회전(상->좌, 하->우, 좌->하, 우->상)
RIGHT = [3, 2, 0, 1]  # 우회전 (상->우, 하->좌, 좌->상, 우->하)
BACK = [1, 0, 3, 2]  # 180도 회전(상->하, 하->상, 좌->우, 우->좌)
MINPATH_ORDER = [2, 1, 3, 0]  # 최단거리 우선순위: 좌하우상


def in_range(N, r, c):
    return 1 <= r <= N and 1 <= c <= N


def explore(N, r, c, d, G, visited):
    for k in (d, LEFT[d], RIGHT[d], BACK[d]):  # 직,좌,우,180
        nr, nc = r + dr[k], c + dc[k]
        if in_range(N, nr, nc) and G[nr][nc] == 0 and not visited[nr][nc]:
            visited[nr][nc] = True  # nr,nc 좌표를 탐험했는지 여부
            return nr, nc, k
    return None


def bfs(N, R, C, G, visited):
    dist = [[-1] * (N + 1) for _ in range(N + 1)]  # 현재 좌표에서 목적지까지의 최단거리
    dir = [[-1] * (N + 1) for _ in range(N + 1)]
    dist[R][C] = 0
    q = deque([(R, C)])
    res = None  # 거리, r, c

    while q:
        r, c = q.popleft()
        if res and dist[r][c] > res[0]:  # 현재의 최단거리보다 더 멀면 break
            break
        if not visited[r][c]:
            if res is None or (dist[r][c], r, c) < res:
                res = (dist[r][c], r, c)
            continue
        for k in MINPATH_ORDER:
            nr, nc = r + dr[k], c + dc[k]
            if in_range(N, nr, nc) and G[nr][nc] == 0 and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                dir[nr][nc] = k
                q.append((nr, nc))

    if res is None:
        return None
    _, tr, tc = res
    return tr, tc, dir[tr][tc]


def solve():
    N, r, c, d = map(int, input().split())
    d -= 1
    grid = [[1] * (N + 1)] + [[1] + list(map(int, input().split())) for _ in range(N)]  # 바다 (0: 헤엄 o, 1: 헤엄 x)
    visited = [[False] * (N + 1) for _ in range(N + 1)]
    visited[r][c] = True
    result = [(r, c)]

    while True:
        res = explore(N, r, c, d, grid, visited)  # r,c,방향
        if res is None:
            res = bfs(N, r, c, grid, visited)  # 가장 가까운 바다로 이동
            if res is None:
                break

        r, c, d = res
        visited[r][c] = True
        result.append((r, c))

    for x, y in result:
        print(x, y)


solve()
