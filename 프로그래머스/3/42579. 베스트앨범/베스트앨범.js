/**
 * 많이 재생된 노래 두개씩 모아 앨범 출시
 * 노래 -> 고유번호로 구분
 *
 * 노래 수록기준
 * 1. 속한 노래가 많이 재생된 장르 먼저
 * 2. 장르 내에서 많이 재생된 노래 먼저
 * 3. 장르 내 재생횟수 같은 노래는 고유번호가 낮은 노래 먼저
 **/

function solution(genres, plays) {
    const answer = [];
    const genres_count = {}; //key: 장르, value: 장르별 plays 총합
    const plays_count = {}; //{"classic": [[0,500], [2,150]], ...}

    for (let i = 0; i < genres.length; i++) {
        let temp = genres[i];
        let count = plays[i];
        genres_count[temp] = (genres_count[temp] || 0) + count;

        plays_count[temp] = plays_count[temp] || [];
        plays_count[temp].push([i, count]);
    }

    const sorted_genres = Object.keys(genres_count).sort(
        (a, b) => genres_count[b] - genres_count[a] //큰거부터
    );

    for (let genre of sorted_genres) {
        const songs = plays_count[genre]; //[[0,500], [2,150], ...]

        songs.sort((a, b) => {
            if (a[1] !== b[1]) {
                return b[1] - a[1]; //재생횟수 큰 순
            }
            return a[0] - b[0]; //같으면 고유번호 작은 순
        });

        answer.push(songs[0][0]);
        if (songs.length > 1) {
            answer.push(songs[1][0]);
        }
    }
    return answer;
}
