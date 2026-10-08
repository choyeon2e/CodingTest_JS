#import sys
from collections import deque

#sys.stdin = open('input.txt')

"""
5x5 크기의 유적지. 각 칸에는 유물조각 배치
유물조각 7개. (1~7)

1) 탐사 진행
[3x3 격자 선택]
5x5 격자 내에서 3x3 격자 선택해서 격자 회전 가능
선택된 격자는 시계방향으로 90,180,270도 중 하나의 각도로 회전가능
선택된 격자는 회전을 진행해야"만"함

- 유물 1차 획득 가치 최대화 목표
- 방법 여러개면 회전각도 가장 작은법을 선택
- 그것도 여러개면 회전 중심좌표 열이 가장 작은 구간. 그것도 같으면 행이 가장 작은 구간.
 

2) 유물 획득
[유물 1차 획득]
상하좌우 인접 같은 종류의 유물조각들은 서로 연결되어있음 => bfs로 find_group
3개 이상 연결된 경우 조각이 모여 유물이 되어 사라짐 => 유물의 가치: 모인 조각의 개수

유적 벽에 1~7 숫자 M개 적힘 => 조각이 사라진곳에 새로 생기는 조각 정보
- 열번호 작은 순으로 생김
- 같다면 행번호 큰 순으로 생김
한번쓴 벽 숫자는 다시 못쓰므로 다음엔 그다음벽숫자부터 사용
 
[유물 연쇄 획득]
새로 생겨나고도 3개 이상 연결되면 똑같이 유물이 돼서 사라짐
이 과정은 더이상 유물이 생기지않을때까지 반복 (같은 종류가 3개 이상 연결 x)

3) 탐사 반복
탐사진행~유물연쇄획득까지가 1턴 - 총K번 턴
각 턴마다 획득한 유물 가치 총합 출력

=> 어떤 방법으로도 유물을 획득할 수 없으면 탐사 즉시 종료하고 그 턴은 출력 x
"""

K, M = map(int, input().split())
grid = [list(map(int, input().split())) for _ in range(5)]
wall = list(map(int, input().split()))
idx = 0

dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]


def in_range(r, c):
    return 0 <= r < 5 and 0 <= c < 5


def rotate(g, cr, cc, cnt):  # 중심 (cr,cc), 90도 회전할 횟수 cnt
    new = [row[:] for row in g]
    sr, sc = cr - 1, cc - 1  # 회전격자 시작점

    for _ in range(cnt):
        temp = [row[:] for row in new]

        for i in range(3):
            for j in range(3):
                new[sr + i][sc + j] = temp[sr + 2 - j][sc + i]
    return new


def find_group(g):  # 3개 이상 인접한 조각(유물이 될것)찾아서 return
    visited = [[False] * 5 for _ in range(5)]
    result = []

    for i in range(5):
        for j in range(5):
            if visited[i][j]:
                continue
            visited[i][j] = True
            q = deque([(i, j)])
            arr = [(i, j)]

            while q:
                r, c = q.popleft()
                for d in range(4):
                    nr, nc = r + dr[d], c + dc[d]
                    if in_range(nr, nc) and not visited[nr][nc] and g[nr][nc] == g[i][j]:
                        visited[nr][nc] = True
                        q.append((nr, nc))
                        arr.append((nr, nc))

            if len(arr) >= 3:
                result += arr
    return result


def fill(g):  # 벽숫자로 빈 격자 채우기
    global idx
    for c in range(5):
        for r in range(4, -1, -1):  # 4,3,2,1
            if g[r][c] == 0:  # 격자가 비어있으면
                g[r][c] = wall[idx]  # 벽숫자로 채우기
                idx += 1


answer = []
for _ in range(K):
    best_v = 0
    best_g = None
    for cnt in range(1, 4):
        for cc in range(1, 4):
            for cr in range(1, 4):
                g = rotate(grid, cr, cc, cnt)
                value = len(find_group(g))
                if value > best_v:
                    best_v = value
                    best_g = g

    if best_v == 0:
        break

    grid = best_g
    total = 0
    while True:
        to_remove = find_group(grid)
        if not to_remove:
            break
        total += len(to_remove)
        for r, c in to_remove:
            grid[r][c] = 0
        fill(grid)
    answer.append(total)

print(*answer)
