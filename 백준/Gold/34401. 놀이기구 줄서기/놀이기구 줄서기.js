const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, P, K] = input[0].split(" ").map(Number);
const groups = [];

for (let i = 1; i <= N; i++) {
  const [t, a] = input[i].split(" ").map(Number);
  groups.push({ t, a });
}

/**
 * 작은 그룹을 먼저 찾아 태움
 * -> 실제로 대기 시간이 줄어들까?
 * 각 그룹은 서로 다른 시간에 대기열에 도착.
 * 0초부터 시작하여 P초마다 탑승, 한번에 최대 K명 탑승 가능
 * 먼저 도착한 그룹부터 탑승. 대기열 도착 시점부터 곧바로 탑승 가능
 * 모든 인원이 한번에 탑승해야함
 * 본인보다 앞에 있는 모든 그룹이 현재 빈 좌석 수보다 인원이 많으면 먼저 탑승이 가능
 * 더이상 탑승할 수 있는 그룹이 없다면 빈좌석있어도 출발
 *
 * 대기시간 = (탑승 시간) - (도착 시간)
 * 모든 그룹의 대기 시간의 합은??
 *
 * N = 그룹의 수, P = 놀이기구의 탑승 간격, K = 인원 제한
 * 각 그룹의 도착 시간 = Ti, 인원 = Ai
 *
 * => 먼저 온 팀이 먼저 타니까 기본적으로 큐를 이용 (선입선출)
 */

groups.sort((a, b) => a.t - b.t); //빨리온 순으로 정렬

let totalWaitTime = 0n;
let groupIdx = 0; // 아직 안온 그룹의 인덱스
let finishedCount = 0; //탑승이 끝난 그룹의 수
let currentTime = 0; //현재 시간

// 인원수별 큐와 각 큐의 현재 위치를 가리킬 포인터(head)
const queues = Array.from({ length: 6 }, () => []);
const heads = Array(6).fill(0);

while (finishedCount < N) {
  //현재 시각까지 도착한 그룹을 각각의 인원수 큐에 배치
  while (groupIdx < N && groups[groupIdx].t <= currentTime) {
    const g = groups[groupIdx];
    queues[g.a].push(g);
    groupIdx++;
  }

  let remainedK = K;
  while (remainedK > 0) {
    let earliestT = Infinity;
    let targetSize = -1;

    // 1명~remainedK명 그룹 중 가장 먼저 도착한 그룹 찾기 (최대 5번 반복)
    for (let size = 1; size <= remainedK; size++) {
      if (heads[size] < queues[size].length) {
        if (queues[size][heads[size]].t < earliestT) {
          earliestT = queues[size][heads[size]].t;
          targetSize = size;
        }
      }
    }

    // 태울 수 있는 가장 빠른 그룹이 있다면
    if (targetSize !== -1) {
      const targetGroup = queues[targetSize][heads[targetSize]];
      totalWaitTime += BigInt(currentTime - targetGroup.t);
      heads[targetSize]++; // 포인터만 이동 (배열 복사 없음)
      remainedK -= targetSize;
      finishedCount++;
    } else {
      break; // 더 이상 태울 그룹 없음
    }
  }

  // 시간 점프(모든 큐가 비었는지 확인)
  let isWaitQueueEmpty = true;
  for (let s = 1; s <= 5; s++) {
    if (heads[s] < queues[s].length) {
      isWaitQueueEmpty = false;
      break;
    }
  }

  if (isWaitQueueEmpty && groupIdx < N) {
    const nextArrival = groups[groupIdx].t;
    if (nextArrival > currentTime) {
      currentTime = Math.ceil(nextArrival / P) * P;
      continue;
    }
  }
  currentTime += P;
}
console.log(totalWaitTime.toString());
