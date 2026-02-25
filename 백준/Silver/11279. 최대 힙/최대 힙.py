import heapq
import sys

input = sys.stdin.readline

n = int(input())
heap = []
results = []

for _ in range(n):
    try:
        line = input().strip()
        if not line: break
        x = int(line)
        
        if x == 0:
            if not heap:
                results.append("0")
            else:
                results.append(str(-heapq.heappop(heap)))
        else:
            heapq.heappush(heap, -x)
    except EOFError:
        break

sys.stdout.write("\n".join(results) + "\n")