/**
 * 옷 조합하기
 * 각 종류별로 최대 1가지 의상만 착용 가능
 * 전날과 아예 같은 옷 조합을 입으면 안됨.
 * 일부는 겹쳐도 되지만 아예 같지는 않아야하고 의상을 추가로 더 착용하거나 해야함
 * 하루에 최소 한개의 의상은 입어야함
 *
 * 서로 다른 옷 조합의 수를 return하기
 * [의상 이름, 의상 종류]
 *
 * solve)
 * map으로 의상종류별 개수를 담고 조합하기 (곱하기)
 * 대신 곱할때는 그 종류를 안입는 경우를 +1해준뒤에 곱하고
 * 마지막에는 아무것도 안입은 경우를 -1 후 리턴
 **/

function solution(clothes) {
    const clothesMap = new Map();

    for (const [name, type] of clothes) {
        clothesMap.set(type, (clothesMap.get(type) || 0) + 1);
    }

    let answer = 1;

    for (const num of clothesMap.values()) {
        answer *= num + 1;
    }

    return answer - 1;
}
