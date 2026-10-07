"""
NxN 정사각형 격자

1. 택배 투입
- 직사각형 모양 wxh, 왼쪽 열의 위치 c, 번호 k
- 중력에 의해 하단으로 떨어짐
- 바닥에 닿거나 다른 짐 만나면 거기서 멈춤 -> 테트리스 쌓듯이
- 완료됐을 때 모든 택배들이 격자 내에 있음은 보장됨

2. 택배 하차 (좌측)
- 잡고 왼쪽으로 뺐을때 다른 택배랑 안부딪히고 바로 뺄수있는 택배 먼저 하차
    => 포함되는 행에 해당 택배보다 더 좌측 열에 있는 택배가 없는 경우
- 여러개 하차가능하면 번호k가 작은것부터 하차
- 택배 하나 하차한 뒤 남은 택배들 중 더 떨어질 수 있는건 떨어지기

3. 택배 하차 (우측)
- 2를 우측에서도 진행

- 모든 택배를 하차할때까지 2,3을 반복
- 하차되는 택배의 번호를 순서대로 출력하자
"""

N, M = map(int, input().split())  #N = 격자 크기, M = 택배 개수
grid = [[0] * (N + 1) for _ in range(N + 1)]  #NxN 크기의 격자
boxes = {}  # 택배 번호 -> [r, c, h, w], r = 초기 시작 행, c = 초기 시작 열

def place(k):  #택배를 격자에 놓기(택배의 초기위치)
    r, c, h, w = boxes[k]
    for i in range(r, r + h):
        for j in range(c, c + w):
            grid[i][j] = k

def erase(k):  #택배를 격자에서 지우기
    r, c, h, w = boxes[k]
    for i in range(r, r + h):
        for j in range(c, c + w):
            grid[i][j] = 0

def can_down(k):    #현재 택배가 아래로 더 내려갈 수 있는지 여부 확인
    r, c, h, w = boxes[k]
    if r+h > N:
        return False
    for j in range(c, c+w):
        if grid[r+h][j] != 0:
            return False
    return True

def fall(k):    #택배를 가능한 곳까지 떨어뜨리기
    erase(k)
    while can_down(k):  #택배가 더 떨어질 수 있다면
        boxes[k][0] += 1    #위치하는 시작 행에 +1 => 택배가 1씩 떨어지고 있는 것
    place(k)

def can_out(k, side):   #택배 하차 (side: 좌측/우측) 가능한지 여부 확인
    r,c,h,w = boxes[k]
    for i in range(r, r+h):
        if side == 'L':
            cols = range(1,c)
        else:
            cols = range(c+w, N+1)
        for j in cols:
            if grid[i][j] != 0: #범위 내에 다른 택배가 있으면
                return False    #side쪽으로 하차 불가
    return True

def gravity():  #택배 하차 후에 떠있는 택배들이 있다면 중력으로 내리는 작업
    moved = True
    while moved:
        moved = False
        for box in sorted(boxes):
            before = boxes[box][0]
            fall(box)
            if before != boxes[box][0]:
                moved = True

def unload(side):  #실제 택배 하차
    for box in sorted(boxes):
        if can_out(box, side):
            erase(box)  # 격자에서 지우고
            del boxes[box]  # 실제로도 del하기
            print(box)
            gravity()
            return

for _ in range(M):
    k, h, w, c = map(int, input().split())
    boxes[k] = [1, c, h, w]
    fall(k)

while boxes:
    unload('L')
    if boxes:
        unload('R')