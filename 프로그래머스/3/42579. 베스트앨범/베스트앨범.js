/**
 * 장르별 가장 많이 재생된 노래 두개 모으기
 * 노래는 고유번호로 구분
 *
 * 노래 수록 기준
 * 속한 노래가 많이 재생된 장르 먼저 수록
 * 장르에서 많이 재생된 노래 먼저 수록
 * 재생횟수 같으면 고유번호 낮은 노래 먼저 수록
 *
 * 장르에 속한 곡이 하나라면 하나의 곡만 선택
 **/

function solution(genres, plays) {
    const genreTotal = {}; // 장르별 총 재생 횟수
    const genreMap = {}; // 장르별 곡 정보 목록

    genres.forEach((genre, i) => {
        const play = plays[i];
        genreTotal[genre] = (genreTotal[genre] || 0) + play;

        if (!genreMap[genre]) genreMap[genre] = [];
        genreMap[genre].push({ id: i, play: play });
    });

    const sortedGenres = Object.keys(genreTotal).sort((a, b) => {
        return genreTotal[b] - genreTotal[a];
    });

    const result = [];

    sortedGenres.forEach((genre) => {
        const songs = genreMap[genre];

        songs.sort((a, b) => {
            if (a.play === b.play) {
                return a.id - b.id;
            }
            return b.play - a.play;
        });

        result.push(...songs.slice(0, 2).map((song) => song.id));
    });

    return result;
}
