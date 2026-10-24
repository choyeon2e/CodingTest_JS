/**
 * 모든 트럭이 다리를 건너려면 최소 몇초?
 * 다리에 처음 올라간 뒤 다리를 내려올때까지 다리 길이만큼의 시간 걸림
 * 초당 버스 1개만 다리에 올라갈 수 있고 초당 버스 1개만 다리에서 빠져나올 수 있음
 **/

function solution(bridge_length, weight, truck_weights) {
    const bridge = []; //{ w: 무게, out: 내리는 시간 }
    let bw = 0;
    let time = 0;

    while (truck_weights.length > 0 || bridge.length > 0) {
        time += 1;

        if (bridge.length > 0 && bridge[0].out === time) {
            bw -= bridge.shift().w;
        }

        if (truck_weights.length > 0 && bw + truck_weights[0] <= weight) {
            const w = truck_weights.shift();
            bridge.push({ w: w, out: time + bridge_length });
            bw += w;
        }
    }
    return time;
}
