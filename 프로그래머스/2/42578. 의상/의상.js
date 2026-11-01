/**
 * 옷 조합하기
 * 종류별로 최대 1가지 의상만 착용 가능
 * 전날과 완전 같은 옷을 입으면 안됨
 *
 * 하루에 최소 한개의 의상은 입는다. (다벗는것은 x)
 * 서로 다른 옷 조합의 수를 return
 **/

function solution(clothes) {
    const clothes_map = new Map();
    let answer = 1;

    for (const c of clothes) {
        clothes_map.set(c[1], (clothes_map.get(c[1]) || 0) + 1);
    }

    for (const v of clothes_map.values()) {
        answer *= v + 1;
    }

    return answer - 1;
}
