from collections import deque

"""
4 3 2 
0 0 0 0
0 1 0 0
0 0 0 0
0 0 0 0
0 0
0 1
2 0
3 0 45
3 1 30

"""

N, M, K = map(int, input().split()) #격자 N, 거북이 M, 화산 K
grid = [list(map(int, input().split())) for _ in range(N)]  #격자
turtles = [list(map(int, input().split())) for _ in range(M)]    #거북이 위치
volcanoes = []  #화산 정보
for _ in range(K):
    r,c,p = map(int, input().split())   #r,c = 화산 위치 / p = 임계 압력
    volcanoes.append([r,c,p,0])

ALIVE, FOSSIL, DONE = 0,1,2
state = [ALIVE] * M
answer = [-1] * M

dr = [0,1,0,-1] #우,하,좌,상
dc = [1,0,-1,0] #우,하,좌,상
GR, GC = N-1, N-1   #안식처 위치

def in_range(r,c):  #격자 안에 있는 좌표인가 확인하는 함수
    return 0 <= r < N and 0 <= c < N

def move_turtles(t, turn):  #t=현재 거북이, turn=현재 턴
    blocked = set() #현재 시점에서의 장애물
    for u in range(M):
        if u != t and state[u] != DONE: #자기 자신과 도착한 거북이는 장애물이 아니니까 확인 후 제외
            blocked.add((turtles[u][0], turtles[u][1]))

    dist = [[-1]*N for _ in range(N)]

    if (GR,GC) not in blocked:
        dist[GR][GC] = 0
        q = deque([(GR,GC)])
        while q:
            r,c = q.popleft()
            for d in range(4):
                nr, nc = r + dr[d], c + dc[d]
                if in_range(nr,nc) and dist[nr][nc] == -1 \
                        and grid[nr][nc] != 1 and (nr, nc) not in blocked:
                    dist[nr][nc] = dist[r][c] + 1
                    q.append((nr,nc))


    r,c = turtles[t]
    if dist[r][c] <= 0:
        return
    for d in range(4):
        nr, nc = r + dr[d], c + dc[d]
        if in_range(nr,nc) and dist[nr][nc] == dist[r][c] - 1:
            turtles[t] = [nr,nc]
            break

    if turtles[t] == [GR,GC]:   #안식처에 도착하면
        state[t] = DONE
        answer[t] = turn


def spread_heat(heat, r, c, p):
    heat[r][c] += p
    for d in range(4):
        h, nr, nc = p, r, c
        while True:
            nr += dr[d]
            nc += dc[d]
            h //= 2 #2로 나누고 소수점 버림(정수 몫으로 값이 나옴)
            if not in_range(nr,nc) or grid[nr][nc] == 1 or h == 0:
                break
            heat[nr][nc] += h


for turn in range(1,101):
    #1단계: 이동
    for t in range(M):
        if state[t] == ALIVE:
            move_turtles(t, turn)

    #2단계: 압력 10 증가
    for v in volcanoes:
        v[3] += 10

    #3단계: 분출+연쇄
    heat = [[0] * N for _ in range(N)]
    erupted = [False] * K

    while True:
        new = []    #새로 분출할 화산들의 번호
        for i in range(K):
            r, c, p, pressure = volcanoes[i]
            if not erupted[i] and pressure + heat[r][c] >= p:   #아직 분출하지 않았고 총 열기가 임계압력을 넘은 경우
                new.append(i)   #새로 분출해야하므로 new에 추가
        if not new:
            break
        for i in new:
            erupted[i] = True
            r, c, p, _ = volcanoes[i]
            spread_heat(heat, r, c, p)
    
    #화석화
    for t in range(M):
        if state[t] == ALIVE and heat[turtles[t][0]][turtles[t][1]] >= 20:
            state[t] = FOSSIL
    
    #4단계: 초기화
    for i in range(K):
        if erupted[i]:
            volcanoes[i][3] = 0
    
    if ALIVE not in state:
        break

for a in answer:
    print(a)