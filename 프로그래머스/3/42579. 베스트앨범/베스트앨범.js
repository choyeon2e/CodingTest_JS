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
    const genre_set = {};
    const songs_set = {};
    const answer = [];

    for (let i = 0; i < genres.length; i++) {
        genre_set[genres[i]] = (genre_set[genres[i]] || 0) + plays[i];
        songs_set[genres[i]] = songs_set[genres[i]] || [];
        songs_set[genres[i]].push([i, plays[i]]);
    }

    const sorted_genre = Object.keys(genre_set).sort((a, b) => {
        return genre_set[b] - genre_set[a];
    });

    for (const genre of sorted_genre) {
        const songs = songs_set[genre];

        songs.sort((a, b) => {
            if (a[1] !== b[1]) {
                return b[1] - a[1]; //재생횟수 큰 순
            }
            return a[0] - b[0]; //고유번호 낮은 순
        });

        answer.push(songs[0][0]);
        if (songs.length > 1) {
            answer.push(songs[1][0]);
        }
    }
    return answer;
}
