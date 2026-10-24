/**
 * 캐시교체알고리즘: LRU - 가장 오래전에 사용된게 바뀜
 * cache hit 실행시간: 1
 * cache miss 실행시간: 5
 **/

function solution(cacheSize, cities) {
    if (cacheSize === 0) return cities.length * 5;

    const cache = [];
    let answer = 0;

    for (let i = 0; i < cities.length; i++) {
        const city = cities[i].toLowerCase();

        if (cache.includes(city)) {
            //cache hit
            cache.splice(cache.indexOf(city), 1);
            cache.push(city);
            answer += 1;
        } else if (cache.length < cacheSize) {
            //cache miss지만 캐시에 자리가 있을때
            cache.push(city);
            answer += 5;
        } else {
            //cache miss이고 캐시가 full
            cache.shift();
            cache.push(city);
            answer += 5;
        }
    }
    return answer;
}
