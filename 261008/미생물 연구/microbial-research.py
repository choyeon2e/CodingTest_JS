import sys
from collections import deque

sys.stdin = open('input.txt')

"""
NxN 정사각형 배양용기
좌측 하단의 좌표: (0,0)
가장 우측 상단의 좌표: (N,N)

Q번의 실험
1. 미생물 투입
- 좌측 하단 (r1, c1), 우측 상단 (r2,c2)인 직사각형 영역에 미생물 투입
- 다른 미생물이 존재한다면 기존 미생물 없어지고 영역에 새 미생물만 남게 됨
- 기존 미생물 무리 A가 B에게 잡아먹히면서 A 영역이 둘 이상으로 나눠지면 A 나눠진 A 미생물은 용기에서 모두 사라짐
    
2. 배양용기 이동
- 모든 미생물 새 배양용기로 이동 (새 배양용기의 크기는 기존과 동일)
- 기존 배양용기에 미생물이 아예 없을때까지 반복
- 기존 배양 용기에 있는 무리 중 가장 영역이 넓은 무리 선택 (둘 이상이면 먼저 투입된 것)
- 선택된 미생물 새 배양용기에 옮김
    - 이때 기존용기에서의 무리 형태는 유지
    - 미생물이 배양 용기의 범위 벗어나지않고 다른 미생물과 겹치지 않아야함
    - 이 조건 내에서 최대한 x 좌표가 작게 옮겨야함. (둘 이상이라면 최대한 y좌표가 작게)
- 옮기면서 어떤 곳에도 둘 수 없는 미생물 무리는 그냥 소멸함

3. 기록
- 상하좌우로 맞닿은 면이 있는 무리: 인접한 무리
- 모든 인접한 무리 쌍 확인. 중복확인은 x
- 두 무리의 넓이를 곱한만큼의 성과
- 이 모든 성과를 더한 값이 결과 -> 기록

각 실험의 결과를 출력하자
"""

N, Q = map(int, input().split())
bacteria = []
for _ in range(Q):
    r1, c1, r2, c2 = map(int, input().split())
    bacteria.append([r1, c1, r2, c2])

grid = [[0] * N for _ in range(N)]

dr = [-1, 0, 1, 0]  # 상,우,하,좌 (시계방향)
dc = [0, 1, 0, -1]  # 상,우,하,좌 (시계방향)


def in_range(r, c):
    if 0 <= r < N and 0 <= c < N:
        return True
    else:
        return False


def put_bacteria(r1, c1, r2, c2, num):
    for i in range(r1, r2):
        for j in range(c1, c2):
            grid[i][j] = num


def make_group():  # 무리를 그룹으로 만들기
    group = {}
    for x in range(N):
        for y in range(N):
            num = grid[x][y]
            if num == 0:
                continue
            if num not in group:
                group[num] = []
            group[num].append((x, y))
    return group


def check_connect(num, cells):  # num번 무리, cells: 그 무리의 칸 목록
    start = cells[0]
    visited = [[False] * N for _ in range(N)]
    visited[start[0]][start[1]] = True
    count = 1

    q = deque([start])
    while q:
        x, y = q.popleft()
        for k in range(4):
            nx, ny = x + dr[k], y + dc[k]
            if in_range(nx, ny) and grid[nx][ny] == num and not visited[nx][ny]:
                visited[nx][ny] = True
                count += 1
                q.append((nx, ny))

    return count == len(cells)


def remove_split():  # 나뉜 무리를 제거
    group = make_group()
    for num, cells in group.items():
        if not check_connect(num, cells):  # 만약에 나눠져있으면
            for x, y in cells:
                grid[x][y] = 0  # 해당 미생물은 모두 사라져야하므로 cells의 좌표를 모두 0으로


def can_place(new, shape, bx, by):  # shape을 (bx, by) 기준으로 new에 놓을 수 있는지
    for dx, dy in shape:
        x, y = bx + dx, by + dy
        if not in_range(x, y) or new[x][y] != 0:
            return False
    return True


def move_bacteria():  # 새 배양 용기로 이동
    group = make_group()
    new = [[0] * N for _ in range(N)]

    # 넓이 큰 순, 같으면 먼저 투입된(번호 작은) 순
    order = sorted(group, key=lambda num: (-len(group[num]), num))

    for num in order:
        cells = group[num]
        min_x = min(x for x, y in cells)
        min_y = min(y for x, y in cells)
        shape = [(x - min_x, y - min_y) for x, y in cells]  # 모양 (상대 위치)

        placed = False
        for bx in range(N):  # x가 작은 위치부터
            for by in range(N):  # 같으면 y가 작은 위치부터
                if can_place(new, shape, bx, by):
                    for dx, dy in shape:
                        new[bx + dx][by + dy] = num
                    placed = True
                    break
            if placed:
                break
        # 어디에도 못 놓으면 아무것도 안 함 = 사라짐

    for x in range(N):  # 새 용기를 grid에 복사
        for y in range(N):
            grid[x][y] = new[x][y]


def plus_result():  # 인접한 무리 쌍의 넓이 곱 합
    group = make_group()
    pairs = set()  # 중복제거용
    for x in range(N):
        for y in range(N):
            a = grid[x][y]  # 지금 칸의 무리 번호
            if a == 0:
                continue  # 빈칸은 건너뜀
            for k in range(4):  # 상하좌우 이웃 확인
                nx, ny = x + dr[k], y + dc[k]
                if in_range(nx, ny):
                    b = grid[nx][ny]  # 이웃 칸의 무리 번호
                    if b != 0 and b != a:  # 빈칸도 아니고 나와 다른 번호면 두 무리가 맞닿아 있는것
                        pairs.add((min(a, b), max(a, b)))
    total = 0
    for a, b in pairs:
        total += len(group[a]) * len(group[b])
    return total


for i in range(Q):
    r1, c1, r2, c2 = bacteria[i]
    put_bacteria(r1, c1, r2, c2, i + 1)  # 번호는 1부터
    remove_split()
    move_bacteria()
    print(plus_result())
