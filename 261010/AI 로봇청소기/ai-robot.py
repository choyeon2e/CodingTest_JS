from collections import deque

dr = [0, 1, 0, -1]  # 우하좌상
dc = [1, 0, -1, 0]


def in_range(N, r, c):
    return 0 <= r < N and 0 <= c < N


def bfs(N, G, sr, sc, blocked):
    """거리 배열 반환 (도달 불가 -1)"""
    dist = [[-1] * N for _ in range(N)]
    dist[sr][sc] = 0
    q = deque([(sr, sc)])

    while q:
        r, c = q.popleft()
        for k in range(4):
            nr, nc = r + dr[k], c + dc[k]
            if not in_range(N, nr, nc) or dist[nr][nc] != -1:
                continue
            if G[nr][nc] == -1 or (nr, nc) in blocked:
                continue
            dist[nr][nc] = dist[r][c] + 1
            q.append((nr, nc))
    return dist


def move_robots(N, G, robots):
    """1) 1번부터 한 대씩 가장 가까운 오염 격자로 이동"""
    K = len(robots)
    for i in range(K):
        r, c = robots[i]
        if G[r][c] > 0:  # 현재 칸이 오염 => 거리 0, 제자리
            continue
        blocked = set(tuple(robots[j]) for j in range(K) if j != i)  # 나 빼고 다른 청소기
        dist = bfs(N, G, r, c, blocked)
        best = None
        
        for x in range(N):          # 행 -> 열 순으로 훑으므로
            for y in range(N):      # 거리가 같으면 먼저 본 칸이 우선
                if G[x][y] > 0 and dist[x][y] != -1:
                    if best is None or dist[x][y] < best[0]:
                        best = (dist[x][y], x, y)
        if best:
            robots[i] = [best[1], best[2]]


def clean_cells(r, c, d):
    """바라보는 방향 d 기준 청소 칸: 본인, 정면, 좌, 우 (뒤쪽 제외)"""
    cells = [(r, c)]
    for k in (d, (d + 1) % 4, (d + 3) % 4):
        cells.append((r + dr[k], c + dc[k]))
    return cells


def clean(N, G, robots):
    """2) 한 대씩 먼지량 합이 가장 큰 방향으로 청소 (격자당 최대 20)"""
    for r, c in robots:
        best_sum, best_d = -1, 0
        for d in range(4):  # 우하좌상. 합이 같으면 먼저 본 방향 유지
            s = 0
            for nr, nc in clean_cells(r, c, d):
                if in_range(N, nr, nc) and G[nr][nc] > 0:
                    s += min(G[nr][nc], 20)
            if s > best_sum:
                best_sum, best_d = s, d

        for nr, nc in clean_cells(r, c, best_d):
            if in_range(N, nr, nc) and G[nr][nc] > 0:
                G[nr][nc] -= min(G[nr][nc], 20)


def accumulate(N, G):
    """3) 먼지 있는 모든 격자에 +5"""
    for r in range(N):
        for c in range(N):
            if G[r][c] > 0:
                G[r][c] += 5


def diffuse(N, G):
    """4) 깨끗한 격자에 주변 4방향 먼지 합 // 10 확산 (동시)"""
    add = [[0] * N for _ in range(N)]
    for r in range(N):
        for c in range(N):
            if G[r][c] != 0:  # 깨끗한 칸만 (물건 -1 제외)
                continue
            s = 0
            for k in range(4):
                nr, nc = r + dr[k], c + dc[k]
                if in_range(N, nr, nc) and G[nr][nc] > 0:
                    s += G[nr][nc]
            add[r][c] = s // 10

    for r in range(N):  # 계산 끝난 뒤 한 번에 반영
        for c in range(N):
            G[r][c] += add[r][c]


def total_dust(N, G):
    """5) 전체 먼지량"""
    return sum(G[r][c] for r in range(N) for c in range(N) if G[r][c] > 0)


def solve():
    N, K, L = map(int, input().split())
    grid = [list(map(int, input().split())) for _ in range(N)]  # -1 물건, 0 깨끗, 양수 먼지
    robots = []
    for _ in range(K):
        r, c = map(int, input().split())
        robots.append([r - 1, c - 1])  # 0 index

    for _ in range(L):
        move_robots(N, grid, robots)  # 1) 청소기 이동
        clean(N, grid, robots)        # 2) 청소
        accumulate(N, grid)           # 3) 먼지 축적
        diffuse(N, grid)              # 4) 먼지 확산

        total = total_dust(N, grid)   # 5) 출력
        print(total)
        if total == 0:  # 먼지 없으면 종료
            break


solve()