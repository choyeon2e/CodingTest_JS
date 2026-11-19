def check_row(arr):
    for i in range(9):
        if len(set(arr[i])) != 9:
            return False
    return True


def check_col(arr):
    for j in range(9):
        col = []
        for i in range(9):
            col.append(arr[i][j])
        if len(set(col)) != 9:
            return False
    return True


def check_box(arr):
    for i in range(0, 9, 3):
        for j in range(0, 9, 3):
            box = []
            for di in range(3):
                for dj in range(3):
                    box.append(arr[i + di][j + dj])
            if len(set(box)) != 9:
                return False
    return True


T = int(input())
for test_case in range(1, T + 1):
    arr = [list(map(int, input().split())) for _ in range(9)]

    if check_row(arr) and check_col(arr) and check_box(arr):
        ans = 1
    else:
        ans = 0

    print(f"#{test_case} {ans}")