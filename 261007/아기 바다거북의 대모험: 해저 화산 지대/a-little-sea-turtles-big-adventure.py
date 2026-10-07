from collections import deque

"""
바다거북 M마리 안식처로
바다: NxN 크기 격자
안식처: (N-1, N-1)
최대 100턴, 각 턴은 아래 4단계 구성

1) 바다거북 이동
1번부터 한마리씩 이동. 안식처까지 최단경로 탐색
- 장애물: 산호초(1), 다른 바다거북, 화석
- 규칙: 최단경로 있으면 그 경로의 첫칸으로 한칸 이동
    - 여러개면 우, 하, 좌, 상 순서로 우선순위
    - 최단경로 없으면 이동x 제자리
- 안식처 도착: (N-1, N-1) 도착하면 바로 지도에서 제외 => 도착시간 기록
- 화산칸 진입 가능.

2) 화산 압력 증가
모든 해저화산 마그마 압력이 각각 10 증가

3) 화산 분출 & 연쇄반응
현재 마그마 압력이 분출임계치 P 이상인 화산 열기 분출
- 열기 전파
    - 화산 칸에 P만큼의 열기 발생
    - 상하좌우 4방향으로 열기 전파. 한칸 이동때마다 이전칸 열기의 절반(소수점 내림)
    - 산호초 만남 or 열기값 0이 되면 전파 중단
    - 한칸에 여러 화산 열기가 도달하면 그 값 모두 합산
- 연쇄 반응
    - 아직 분출 x 화산 중 현재 마그마 압력 + 누적 외부 열기 >= P 면 즉시 분출 시작
    - 외부 열기는 실제 마그마 압력수치 자체 증가는 x
    - 새 분출화산이 없을때까지 연쇄 분출 과정 반복
- 화석화
    - 모든 분출 끝나고 살아있는 거북이 위치 칸이 총 열기 합이 20 이상이면 화석
    - 화석되면 거북이 위치 고정. 장애물이 됨
- 환경 초기화
    - 모든 열기 정보 사라짐
    - 이번턴 분출된 모든 화산 마그마 압력 0으로 초기화
    - 분출 x 화산 압력은 그대로 유지
    
=> M개의 줄에 거쳐 각 바다거북이 안식처에 도착한 턴번호 출력
=> 100턴 내에 도착x or 화석되었으면 -1 출력
"""

N, M, K = map(int, input().split())  # 격자 N, 거북이 M, 화산 K
grid = [list(map(int, input().split())) for _ in range(N)]
turtles = [list(map(int, input().split())) for _ in range(M)]
volcanoes = []

for _ in range(K):
    r, c, p = map(int, input().split())
    volcanoes.append([r, c, p, 0])

ALIVE, FOSSIL, DONE = 0, 1, 2
state = [ALIVE] * M  # 거북이 상태 저장
answer = [-1] * M

dr = [0, 1, 0, -1]  # 우,하,좌,상
dc = [1, 0, -1, 0]  # 우,하,좌,상


def in_range(r, c):
    return 0 <= r < N and 0 <= c < N


def move_turtles(t, turn):
    blocked = set()
    for m in range(M):
        if m != t and state[m] != DONE:
            blocked.add((turtles[m][0], turtles[m][1]))

    dist = [[-1] * N for _ in range(N)]

    if (N - 1, N - 1) not in blocked:
        dist[N - 1][N - 1] = 0
        q = deque([(N - 1, N - 1)])
        while q:
            r, c = q.popleft()
            for d in range(4):
                nr, nc = r + dr[d], c + dc[d]
                if in_range(nr, nc) and dist[nr][nc] == -1 and grid[nr][nc] != 1 and (nr, nc) not in blocked:
                    dist[nr][nc] = dist[r][c] + 1
                    q.append((nr, nc))

    r, c = turtles[t]
    if dist[r][c] <= 0:
        return
    for d in range(4):
        nr, nc = r + dr[d], c + dc[d]
        if in_range(nr, nc) and dist[nr][nc] == dist[r][c] - 1:
            turtles[t] = [nr, nc]
            break

    if turtles[t] == [N - 1, N - 1]:
        state[t] = DONE
        answer[t] = turn


def spread_heat(heat, r, c, p):
    heat[r][c] += p
    for d in range(4):
        h, nr, nc = p, r, c
        while True:
            nr += dr[d]
            nc += dc[d]
            h //= 2

            if not in_range(nr, nc) or grid[nr][nc] == 1 or h == 0:
                break
            heat[nr][nc] += h


for turn in range(1, 101):
    for t in range(M):
        if state[t] == ALIVE:
            move_turtles(t, turn)

    for volcano in volcanoes:
        volcano[3] += 10

    heat = [[0] * N for _ in range(N)]
    erupted = [False] * K

    while True:
        new = []
        for i in range(K):
            r, c, p, pressure = volcanoes[i]
            if not erupted[i] and pressure + heat[r][c] >= p:
                new.append(i)
        if not new:
            break
        for i in new:
            erupted[i] = True
            r, c, p, _ = volcanoes[i]
            spread_heat(heat, r, c, p)

    for t in range(M):
        if state[t] == ALIVE and heat[turtles[t][0]][turtles[t][1]] >= 20:
            state[t] = FOSSIL

    for i in range(K):
        if erupted[i]:
            volcanoes[i][3] = 0

    if ALIVE not in state:
        break

for a in answer:
    print(a)
