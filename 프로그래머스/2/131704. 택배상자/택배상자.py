def solution(order):
    answer = []
    subs = []  
    box = 1  

    for i in range(len(order)):
        target = order[i]     

        #target보다 작은 상자는 보조 컨테이너에
        while box < target:
            subs.append(box)
            box += 1

        if box == target:   
            answer.append(box)
            box += 1
        elif subs and subs[-1] == target:  #보조 컨테이너 맨위가 target
            answer.append(subs.pop())
        else:       #둘다 아니면 못실음
            break

    return len(answer)