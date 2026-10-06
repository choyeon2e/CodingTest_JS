from collections import deque

N, K, L = map(int,input().split())    #격자의 크기 N, 로봇청소기 개수 K, 테스트 횟수 L
grid = [[0] * (N + 1)] + [[0] + list(map(int, input().split())) for _ in range(N)]
vacuum = [list(map(int, input().split())) for _ in range(K)]


dr = [0, 1, 0, -1]  #우,하,좌,상
dc = [1, 0, -1, 0]

def in_range(r,c):  #지금 격자 내에 있는지
    return 1 <= r <= N and 1 <= c <= N


def move_vacuum(v): #v번 청소기를 가장 가까운 오염격자로 이동
    sr, sc = vacuum[v]
    if grid[sr][sc] > 0:    #v번 청소기 위치 칸이 오염되어있으면
        return

    #지금 v번 청소기를 제외한 청소기들의 위치
    occupied = set(tuple(vacuum[i]) for i in range(K) if i != v)
    visited = [[False]*(N+1) for _ in range(N+1)]
    visited[sr][sc] = True
    q = deque([(sr,sc)])

    while q:
        candidates = []
        for _ in range(len(q)):
            r,c = q.popleft()
            for d in range(4):
                nr, nc = r + dr[d], c + dc[d]
                if not in_range(nr, nc) or visited[nr][nc]:
                    continue
                if grid[nr][nc] == -1 or (nr,nc) in occupied:
                    continue
                visited[nr][nc] = True
                if grid[nr][nc] > 0:
                    candidates.append((nr,nc))
                q.append((nr,nc))
        if candidates:
            vacuum[v] = list(min(candidates))
            return

def area(r,c,d):    #d 방향을 볼 때 청소 대상 칸 (먼지 있는 칸만)
    cells = [(r,c)]
    for k in (-1, 0, 1):    #왼쪽, 앞, 오른쪽
        nd = (d+k) % 4  #0,1,2,3 = 우,하,좌,상
        cells.append((r + dr[nd], c + dc[nd]))
    return [(x, y) for x, y in cells if in_range(x, y) and grid[x][y] > 0]
    #네칸 중 격자 밖에 있지않고 먼지가 있는 칸만 리턴


def clean(v):   #청소 (본인 칸 + 바라보는 방향 기준 왼/앞/오 청소)
    r,c = vacuum[v]
    best_sum, best_d = -1, 0
    for d in range(4):
        s = 0
        for nr, nc in area(r,c,d):
            s += min(grid[nr][nc], 20)
        if s > best_sum:
            best_sum, best_d = s, d
    for nr, nc in area(r,c,best_d):
        grid[nr][nc] -= min(grid[nr][nc], 20)


def accumulate():   #먼지 축적 => 먼지 양 +5
    for r in range(1, N+1):
        for c in range(1, N+1):
            if grid[r][c] > 0:
                grid[r][c] += 5

def spread():   #먼지 확산 => 깨끗한 격자에 주변 먼지합 // 10
    add = [[0] * (N+1) for _ in range(N+1)]
    for r in range(1, N+1):
        for c in range(1, N+1):
            if grid[r][c] != 0:
                continue
            s = 0
            for d in range(4):
                nr, nc = r + dr[d], c + dc[d]
                if in_range(nr, nc) and grid[nr][nc] > 0:
                    s += grid[nr][nc]
            add[r][c] = s // 10

    for r in range(1, N+1):
        for c in range(1, N+1):
            grid[r][c] += add[r][c]
    
for _ in range(L):
    for v in range(K):
        move_vacuum(v)
    for v in range(K):
        clean(v)
    accumulate()
    spread()

    total_dust = sum(grid[r][c] for r in range(1, N+1) \
                        for c in range(1, N+1) if grid[r][c] > 0)

    print(total_dust)
    if total_dust == 0:
        break