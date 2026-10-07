import sys
from collections import deque

sys.stdin = open('input.txt')

"""
바다 NxN 크기의 격자 => i행 j열 (i, j)로 표현

격자상태)
1. 헤엄칠 수 있는 바다 = 0
2. 지나갈 수 없는 암초 = 1

아기고래 출발 위치: (r, c) / 처음 바라보는 방향 d => 1: 상, 2: 하, 3: 좌, 4: 우
목표: 모든 바다 탐험

아기고래 탐험 단계)
1단계: 인접 탐험
- 상하좌우 인접칸 중 방문 안한 바다칸 한칸 이동
    - 우선순위
        1. 바라보는 방향으로 직진
        2. 좌회전 후 직진
        3. 우회전 후 직진
        4. 180도 회전 후 직진(직진 반대 방향)
- 이동하면 이동한 방향으로 d 갱신
위를 인접한 칸에 방문가능 바다가 없을 때까지 반복

2단계: 가장 가까운 바다로 이동
- 모든 인접칸에 방문가능한 바다가 없으면 아직 방문안한 바다칸 중 현재 위치에서 가장 가까운 칸으로 이동
- 거리: 최소 이동 횟수
- 암초: 지나갈 수 없음 / 이미 방문한 바다: 지나갈 수 있음
- 가장 가까운 칸이 여러개면 행번호 작은 칸 선택. 행 같으면 열번호 작은 칸을 선택
- 최단거리로 이동. 최단 이동거리 칸이 여러개면 우선순위: 좌, 하, 우, 상
- 바라보는 방향은 마지막 이동방향으로 갱신

- 현재 선택한 칸까지 도착하면 다시 1단계부터 반복해서 헤엄칠 수 있는 모든 바다 방문 시 종료
- 바다 칸 위치를 방문 순서대로 출력 (시작 위치 포함)
"""

N, r, c, d = map(int, input().split())
grid = [[1] * (N + 1)] + [[1] + list(map(int, input().split())) for _ in range(N)]

dr = [-1, 0, 1, 0]
dc = [0, 1, 0, -1]  # 상우하좌(시계방향)

# d 1,2,3,4(상,하,좌,우)를 회전하기 쉽게 상우하좌(시계방향) 인덱스로 바꾸기
conv = [0, 0, 2, 3, 1]  # d(1~4) -> 인덱스
d = conv[d]

visited = [[False] * (N + 1) for _ in range(N + 1)]
sea = 0  # 헤엄칠 수 있는 바다의 칸 개수
for i in range(1, N + 1):
    for j in range(1, N + 1):
        if grid[i][j] == 0:
            sea += 1

path = []  # 방문 순서

visited[r][c] = True
path.append((r, c))


def in_range(x, y):
    return 1 <= x <= N and 1 <= y <= N


def explore():  # 인접 탐험
    global r, c, d
    for turn in (0, -1, 1, 2):  # 직진, 좌회전, 우회전, 180도 회전
        nd = (d + turn) % 4
        nr, nc = r + dr[nd], c + dc[nd]
        if in_range(nr, nc) and grid[nr][nc] == 0 and not visited[nr][nc]:
            r, c, d = nr, nc, nd
            visited[r][c] = True
            path.append((r, c))
            return True
    return False


def bfs(sr, sc):
    dist = [[-1] * (N + 1) for _ in range(N + 1)]
    dist[sr][sc] = 0
    q = deque([(sr, sc)])
    while q:
        x, y = q.popleft()
        for k in range(4):
            nx, ny = x + dr[k], y + dc[k]
            if in_range(nx, ny) and grid[nx][ny] == 0 and dist[nx][ny] == -1:
                dist[nx][ny] = dist[x][y] + 1
                q.append((nx, ny))
    return dist


def find_target(dist):
    best = None
    best_d = float('inf')
    for i in range(1, N + 1):
        for j in range(1, N + 1):
            if grid[i][j] == 0 and not visited[i][j] and dist[i][j] != -1:
                if dist[i][j] < best_d:
                    best_d = dist[i][j]
                    best = (i, j)
    return best


def go_to(tr, tc):
    global r, c, d
    to_target = bfs(tr, tc)
    while (r, c) != (tr, tc):
        for k in (3, 2, 1, 0):  # 좌, 하, 우, 상
            nr, nc = r + dr[k], c + dc[k]
            if in_range(nr, nc) and to_target[nr][nc] == to_target[r][c] - 1:
                r, c, d = nr, nc, k
                break
    visited[r][c] = True
    path.append((r, c))


while len(path) < sea:
    if not explore():
        target = find_target(bfs(r, c))
        go_to(target[0], target[1])

for x, y in path:
    print(x, y)
