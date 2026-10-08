from collections import deque

"""
책상 배열 NxN 정사각형
1책상 1학생
1행 1열 ~ N행 N열 총 N^2명 학생
민트(T), 초코(C), 우유(M) 중 하나의 음식만을 신봉

i행 j열에 있는 학생이 초기 신봉하는 음식 = F[i][j] => T,C,M 중 1
i행 j열 학생의 신앙심 = B[i][j]

초기신앙심을 가짐
다른사람들에게 영향받으면 초코우유, 민트우유, 민트초코, 민트초코우유 등 이런 여러 조합을 신봉하는 학생도 생김

T일동안 아,점,저 순으로 아래 과정

1) 아침
모든 학생 B[i][j] + 1 => breakfast

2) 점심
상하좌우 인접 학생들과 F가 완전 같은 경우 그룹 형성 => make_group
그룹 내 대표자 한명 선정. 후보 (r[k], c[k]).
- 대표자 선정 기준
    - B[r[k]][c[k]]가 가장 큰 사람
    - 신앙심 같으면 r[k]가 작은 사람. 이것도 같으면 c[k]가 작은 사람
대표자 제외 그룹원들은 B[i][j] - 1, 대표자는 B[i][j] + 그룹원수 -1
=> select_leader

3) 저녁
대표자들이 신앙 전파 => spread_B
- 전파 순서
    - 단일 음식 (T,C,M)
    - 이중 조합 (CM, TM, TC)
    - 삼중 조합 (TCM)
- 같은 그룹 내에서의 순서
    - 대표자 B가 높은 순
    - B 같으면 r 작은 순
    - r 같으면 c 작은 순

전파자는 B를 1만 남기고 나머지를 간절함 x = B - 1로 바꿔 전파
방향: B%4에 따라 결정 (0: 상, 1: 하, 2: 좌, 3: 우)

전파 방향으로 한칸씩 이동하며 전파 시도. 격자 범위 밖이거나(in_range) 간절함 0 되면 전파 종료
만약 전파 대상의 F가 전파자 F와 완전 같으면 패스하고 다음.
다른 경우에는 전파 진행.

전파)
[강한전파]
전파 대상의 B가 y일때 x>y면 강한전파 성공 (x = B - 1)
-> 완전히 동화되어 동일 F 신봉하게됨.
-> x = x - (y+1)이 되고 전파 대상의 B += 1이 됨
이때 전파자의 x가 0이 되면 전파 더 진행하지않고 종료

[약한전파]
x <= y면 약한전파 성공
-> 전파 음식의 모든 기본음식에 관심 = 기존에 신봉하던 음식의 기본 음식들과 전파자 기본음식을 더한걸 신봉
    ex) F = T인 사람에게 CM 전파자가 약.전하면 대상의 F = TCM이 됨 / 강.전하면 대상의 F = CM이 됨
-> 전파 대상의 B += x. 전파자의 x = 0이 되고 더이상 전파 진행 x.

어떤 학생이 다른 음식의 대표자에게 전파당했다면 그 학생은 즉시 방어상태 -> 당일에는 전파를 x
방어상태에서도 전파를 추가로 받기는 가능

=====> 각 날의 저녁이 끝난 후 TCM, TC, TM, CM, M, C, T 순서로 그룹의 B 총합 출력

"""

N, T = map(int, input().split())
F = [list(input().strip()) for _ in range(N)]
B = [list(map(int, input().split())) for _ in range(N)]

dr = [-1, 1, 0, 0]  # 상하좌우
dc = [0, 0, -1, 1]


def in_range(r, c):
    return 0 <= r < N and 0 <= c < N


def breakfast():
    for i in range(N):
        for j in range(N):
            B[i][j] += 1


def make_group():
    groups = []
    visited = [[False] * N for _ in range(N)]
    for i in range(N):
        for j in range(N):
            if visited[i][j]:
                continue
            visited[i][j] = True
            q = deque([(i, j)])
            members = [(i, j)]
            while q:
                r, c = q.popleft()
                for d in range(4):
                    nr, nc = r + dr[d], c + dc[d]
                    if in_range(nr, nc) and not visited[nr][nc] and F[nr][nc] == F[i][j]:
                        visited[nr][nc] = True
                        q.append((nr, nc))
                        members.append((nr, nc))
            groups.append(members)
    return groups


def select_leader(groups):
    leaders = []
    for group in groups:
        lr, lc = group[0]
        for r, c in group:
            if B[r][c] > B[lr][lc]:
                lr, lc = r, c
            elif B[r][c] == B[lr][lc] and r < lr:
                lr, lc = r, c
            elif B[r][c] == B[lr][lc] and r == lr and c < lc:
                lr, lc = r, c

        for r, c in group:
            if (lr, lc) != (r, c):
                B[r][c] -= 1

        B[lr][lc] += len(group) - 1
        leaders.append((lr, lc))
    return leaders


def lunch():
    groups = make_group()
    leaders = select_leader(groups)
    return leaders


def merge_food(a, b):
    s = set(a) | set(b)
    result = ""
    basic_food = "TCM"
    for ch in basic_food:
        if ch in s:
            result += ch
    return result


def dinner(leaders):
    order = []
    for k in range(1, 4):
        cand = []
        for r, c in leaders:
            if len(F[r][c]) == k:
                cand.append((r, c))
        while cand:
            lr, lc = cand[0]
            for r, c in cand:
                if B[r][c] > B[lr][lc]:
                    lr, lc = r, c
                elif B[r][c] == B[lr][lc] and r < lr:
                    lr, lc = r, c
                elif B[r][c] == B[lr][lc] and r == lr and c < lc:
                    lr, lc = r, c
            cand.remove((lr, lc))
            order.append((lr, lc))

    defense = [[False] * N for _ in range(N)]
    for r, c in order:
        if defense[r][c] == True:
            continue

        food = F[r][c]
        d = B[r][c] % 4
        x = B[r][c] - 1
        B[r][c] = 1

        nr, nc = r + dr[d], c + dc[d]
        while in_range(nr, nc) and x > 0:
            if F[nr][nc] != food:
                y = B[nr][nc]
                if x > y:
                    F[nr][nc] = food
                    x -= y + 1
                    B[nr][nc] += 1
                else:
                    F[nr][nc] = merge_food(F[nr][nc], food)
                    B[nr][nc] += x
                    x = 0

                defense[nr][nc] = True
            nr += dr[d]
            nc += dc[d]


for _ in range(T):
    breakfast()
    leader = lunch()
    dinner(leader)

    answer = {'TCM': 0, 'TC': 0, 'TM': 0, 'CM': 0, 'M': 0, 'C': 0, 'T': 0}
    for i in range(N):
        for j in range(N):
            answer[F[i][j]] += B[i][j]
    print(answer['TCM'], answer['TC'], answer['TM'], answer['CM'], answer['M'], answer['C'], answer['T'])
