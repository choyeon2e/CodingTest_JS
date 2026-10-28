from math import factorial

def solution(n, k):
    people = list(range(1, n + 1))
    answer = []
    k -= 1 

    while people:
        f = factorial(len(people) - 1)
        idx = k // f 
        k = k % f    
        
        answer.append(people.pop(idx))

    return answer