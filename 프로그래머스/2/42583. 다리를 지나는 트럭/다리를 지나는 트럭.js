/**
 * 모든 트럭이 다리를 건너려면 최소 몇초?
 *
 * 트럭이 최대 bridge_length대 올라갈 수 있음
 * 다리는 weight 이하까지 견디기 가능
 **/

function solution(bridge_length, weight, truck_weights) {
    let t = 0;
    let bridgeW = 0; //현재 다리 위에 있는 트럭의 무게
    const bridge = new Array(bridge_length).fill(0);

    while (truck_weights.length > 0 || bridgeW > 0) {
        t++;

        const passedTruck = bridge.shift();
        bridgeW -= passedTruck;

        if (truck_weights.length > 0) {
            if (bridgeW + truck_weights[0] <= weight) {
                const nextTruck = truck_weights.shift();
                bridge.push(nextTruck);
                bridgeW += nextTruck;
            } else {
                bridge.push(0);
            }
        }
    }
    return t;
}
