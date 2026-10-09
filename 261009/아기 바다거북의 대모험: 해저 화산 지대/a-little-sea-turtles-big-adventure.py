#import sys
from collections import deque

#sys.stdin = open('input.txt')

dr = [0, 1, 0, -1]  # 우하좌상
dc = [1, 0, -1, 0]


def in_range(N, r, c):
    return 0 <= r < N and 0 <= c < N


def bfs(N, G, blocked):
    dist = [[-1] * N for _ in range(N)]
    dist[N - 1][N - 1] = 0
    q = deque([(N - 1, N - 1)])

    while q:
        r, c = q.popleft()
        for k in range(4):
            nr, nc = r + dr[k], c + dc[k]
            if in_range(N, nr, nc) and G[nr][nc] == 0 and [nr, nc] not in blocked and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))
    return dist


def move_turtles(N, G, turtles, arrived, fossil, answer, turn):
    M = len(turtles)
    for i in range(M):
        if arrived[i] or fossil[i]:
            continue
        # 장애물: 나 아니고 도착아직 안한 거북이
        blocked = [turtles[j] for j in range(M) if j != i and not arrived[j]]
        dist = bfs(N, G, blocked)

        r, c = turtles[i]
        if dist[r][c] == -1:
            continue
        for k in range(4):
            nr, nc = r + dr[k], c + dc[k]
            if in_range(N, nr, nc) and dist[nr][nc] != -1 and dist[nr][nc] == dist[r][c] - 1:
                turtles[i] = [nr, nc]
                break

        if turtles[i] == [N - 1, N - 1]:
            arrived[i] = True
            answer[i] = turn


def spread(N, G, heat, vr, vc, P):
    heat[vr][vc] += P
    for k in range(4):
        h = P
        r, c = vr, vc
        while True:
            h //= 2
            r, c = r + dr[k], c + dc[k]
            if not in_range(N, r, c) or G[r][c] == 1 or h == 0:
                break
            heat[r][c] += h


def erupt(N, G, volcanoes, pressure):
    K = len(volcanoes)
    heat = [[0] * N for _ in range(N)]
    erupted = [False] * K

    while True:
        new_erupt = []
        for k in range(K):
            r, c, P = volcanoes[k]
            if not erupted[k] and pressure[k] + heat[r][c] >= P:
                new_erupt.append(k)
        if not new_erupt:
            break
        for n in new_erupt:
            r, c, P = volcanoes[n]
            erupted[n] = True
            spread(N, G, heat, r, c, P)

    return heat, erupted


def fossilize(turtles, arrived, fossil, heat):
    for i in range(len(turtles)):
        if not arrived[i] and not fossil[i]:
            r, c = turtles[i]
            if heat[r][c] >= 20:
                fossil[i] = True


def solve():
    N, M, K = map(int, input().split())
    grid = [list(map(int, input().split())) for _ in range(N)]
    turtles = [list(map(int, input().split())) for _ in range(M)]
    volcanoes = [list(map(int, input().split())) for _ in range(K)]
    pressure = [0] * K

    arrived = [False] * M
    fossil = [False] * M
    answer = [-1] * M

    for turn in range(1, 101):
        move_turtles(N, grid, turtles, arrived, fossil, answer, turn)

        for k in range(K):
            pressure[k] += 10

        heat, erupted = erupt(N, grid, volcanoes, pressure)
        fossilize(turtles, arrived, fossil, heat)

        for k in range(K):
            if erupted[k]:
                pressure[k] = 0

        if all(arrived[i] or fossil[i] for i in range(M)):  # 살아있는 거북 없으면 종료
            break

    for a in answer:
        print(a)


solve()
